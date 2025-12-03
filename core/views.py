from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, get_user_model
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.db import transaction as db_transaction
from django.db.models import Sum
from datetime import datetime, timedelta
from decimal import Decimal
from .forms import TransferForm
from .models import Account, Transaction

User = get_user_model()

def is_admin(user):
    return user.is_staff

def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("dashboard")
        messages.error(request, "Identifiants invalides.")
    else:
        form = AuthenticationForm()
    return render(request, "auth/login.html", {"form": form})

@login_required
def logout_view(request):
    logout(request)
    messages.info(request, "Vous avez été déconnecté.")
    return redirect("login")

@login_required
def dashboard_view(request):
    if request.user.is_staff:
        return render(request, "dashboard_admin.html", {"user": request.user})

    # Récupère ou crée le compte avec _id pour l'IBAN
    account, created = Account.objects.get_or_create(
        user=request.user,
        defaults={
            'balance': 0.00,
            'account_number': f"FR76{str(request.user._id)[:10].ljust(10, '0')}"  # Utilise _id
        }
    )

    # Transactions récentes
    sent_transactions = Transaction.objects.filter(sender=request.user).order_by('-timestamp')[:10]
    received_transactions = Transaction.objects.filter(receiver=request.user).order_by('-timestamp')[:10]
    all_transactions = list(sent_transactions) + list(received_transactions)
    all_transactions.sort(key=lambda x: x.timestamp, reverse=True)
    recent_transactions = all_transactions[:10]

    # Statistiques
    now = datetime.now()

    # Totaux globaux
    total_spent = sent_transactions.aggregate(total=Sum('amount'))['total'] or Decimal('0')
    total_received = received_transactions.aggregate(total=Sum('amount'))['total'] or Decimal('0')

    # Mensuel
    first_day_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    monthly_transactions = Transaction.objects.filter(sender=request.user, timestamp__gte=first_day_month)
    monthly_spent = monthly_transactions.aggregate(total=Sum('amount'))['total'] or Decimal('0')
    monthly_count = monthly_transactions.count()

    # Hebdomadaire
    start_week = now - timedelta(days=now.weekday())
    start_week = start_week.replace(hour=0, minute=0, second=0, microsecond=0)
    weekly_transactions = Transaction.objects.filter(sender=request.user, timestamp__gte=start_week)
    weekly_spent = weekly_transactions.aggregate(total=Sum('amount'))['total'] or Decimal('0')
    weekly_count = weekly_transactions.count()

    # Données pour les graphiques (6 derniers mois)
    monthly_data = []
    for i in range(6):
        month_date = now - timedelta(days=30 * i)
        first_day = month_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        if i == 0:
            last_day = now
        else:
            last_day = (first_day + timedelta(days=32)).replace(day=1) - timedelta(days=1)

        month_sent = Transaction.objects.filter(
            sender=request.user,
            timestamp__gte=first_day,
            timestamp__lte=last_day
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0')

        month_received = Transaction.objects.filter(
            receiver=request.user,
            timestamp__gte=first_day,
            timestamp__lte=last_day
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0')

        monthly_data.insert(0, {
            'month': first_day.strftime('%b %Y'),
            'sent': float(month_sent),
            'received': float(month_received)
        })

    context = {
        'user': request.user,
        'account': account,
        'recent_transactions': recent_transactions,
        'total_spent': total_spent,
        'total_received': total_received,
        'monthly_spent': monthly_spent,
        'monthly_count': monthly_count,
        'weekly_spent': weekly_spent,
        'weekly_count': weekly_count,
        'monthly_data': monthly_data,
    }

    return render(request, "dashboard_user.html", context)

@login_required
def home_view(request):
    return render(request, "home.html", {
        "username": request.user.username,
        "is_admin": request.user.is_staff,
    })

@login_required
@user_passes_test(is_admin)
def admin_panel(request):
    users = User.objects.all()
    return render(request, "admin_panel.html", {"users": users})

@login_required
@user_passes_test(is_admin)
def create_user_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        is_staff = request.POST.get('is_staff') == 'on'

        user = User.objects.create_user(
            username=username,
            password=password,
            is_staff=is_staff
        )
        messages.success(request, f"Utilisateur {username} créé avec succès.")
        return redirect('admin_panel')

    return render(request, "create_user.html")

@login_required
def transfer_view(request):
    sender = request.user
    # Utilise _id pour l'IBAN
    sender_account, created = Account.objects.get_or_create(
        user=sender,
        defaults={
            'balance': 0.00,
            'account_number': f"FR76{str(sender._id)[:10].ljust(10, '0')}"  # _id au lieu de id
        }
    )

    if request.method == "POST":
        form = TransferForm(request.POST, user=request.user)
        if form.is_valid():
            receiver_username = form.cleaned_data["receiver_username"]
            amount = form.cleaned_data["amount"]
            description = form.cleaned_data["description"]

            # Vérification que l'utilisateur ne s'envoie pas d'argent à lui-même
            if receiver_username == request.user.username:
                messages.error(request, "Vous ne pouvez pas vous envoyer d'argent à vous-même.")
                return redirect("transfer")

            try:
                receiver = User.objects.get(username=receiver_username)
                receiver_account, created = Account.objects.get_or_create(
                    user=receiver,
                    defaults={
                        'balance': 0.00,
                        'account_number': f"FR76{str(receiver._id)[:10].ljust(10, '0')}"  # _id ici aussi
                    }
                )
            except User.DoesNotExist:
                messages.error(request, "Utilisateur destinataire introuvable.")
                return redirect("transfer")

            if sender_account.balance < amount:
                messages.error(request, "Solde insuffisant.")
                return redirect("transfer")

            with db_transaction.atomic():
                sender_account.balance -= amount
                receiver_account.balance += amount
                sender_account.save()
                receiver_account.save()

                Transaction.objects.create(
                    sender=sender,
                    receiver=receiver,
                    amount=amount,
                    description=description,
                )

            messages.success(request, f"Virement de {amount}€ effectué avec succès.")
            return redirect("dashboard")
    else:
        form = TransferForm(user=request.user)

    return render(request, "transfer.html", {
        "form": form,
        "balance": sender_account.balance,
    })

@login_required
def account_view(request):
    account, created = Account.objects.get_or_create(
        user=request.user,
        defaults={
            'balance': 0.00,
            'account_number': f"FR76{str(request.user._id)[:10].ljust(10, '0')}"  # _id ici
        }
    )
    return render(request, "account.html", {"account": account})

@login_required
def history_view(request):
    sent_transactions = Transaction.objects.filter(sender=request.user).order_by('-timestamp')
    received_transactions = Transaction.objects.filter(receiver=request.user).order_by('-timestamp')
    all_transactions = list(sent_transactions) + list(received_transactions)
    all_transactions.sort(key=lambda x: x.timestamp, reverse=True)
    return render(request, "history.html", {"transactions": all_transactions})

@login_required
def profile_view(request):
    return render(request, "profile.html", {"user": request.user})

@login_required
def delete_account(request):
    if request.method == "POST":
        user = request.user
        username = user.username
        logout(request)
        user.delete()
        messages.success(request, f"Compte {username} supprimé avec succès.")
        return redirect("login")
    return render(request, "delete_account_confirm.html")
