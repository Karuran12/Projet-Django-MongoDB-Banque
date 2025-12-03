<<<<<<< HEAD
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
=======
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.views.decorators.csrf import csrf_protect

# ============================================
# PAGE D'ACCUEIL (HOME)
# ============================================

@login_required(login_url='/login/')
def home_view(request):
    """
    Vue de la page d'accueil - Accessible uniquement aux utilisateurs connectés

    Fonctionnalités :
    - Affiche le nom d'utilisateur
    - Affiche le rôle (ADMIN ou USER)
    - Menu différent selon le rôle
    - Protection par @login_required
    """
    user = request.user

    # Récupération du rôle de l'utilisateur
    # Si vous avez un modèle User personnalisé avec un champ 'role', utilisez user.role
    # Sinon, on vérifie si l'utilisateur est superuser (ADMIN) ou user normal (USER)
    if hasattr(user, 'role'):
        user_role = user.role
    elif user.is_superuser or user.is_staff:
        user_role = 'ADMIN'
    else:
        user_role = 'USER'

    # Contexte envoyé au template
    context = {
        'username': user.username,
        'user_role': user_role,
        'is_admin': user_role == 'ADMIN',
    }

    return render(request, 'core/home_premium.html', context)


# ============================================
# AUTHENTIFICATION - LOGIN
# ============================================

@csrf_protect
def login_view(request):
    """
    Vue de connexion sécurisée

    - Protection CSRF
    - Validation des identifiants
    - Messages d'erreur explicites
    - Redirection vers la page d'accueil après connexion
    """
    # Si l'utilisateur est déjà connecté, redirection vers home
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Validation des champs
        if not username or not password:
            messages.error(request, 'Veuillez remplir tous les champs.')
            return render(request, 'core/login.html')

        # Authentification
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, f'Bienvenue, {user.username} !')

            # Redirection vers la page demandée ou vers home
            next_url = request.GET.get('next', 'home')
            return redirect(next_url)
        else:
            messages.error(request, 'Identifiant ou mot de passe incorrect.')
            return render(request, 'core/login.html')

    return render(request, 'core/login.html')


# ============================================
# AUTHENTIFICATION - REGISTER
# ============================================

@csrf_protect
def register_view(request):
    """
    Vue d'inscription sécurisée

    - Protection CSRF
    - Validation des données
    - Vérification de l'unicité du username et email
    - Hashing automatique du mot de passe
    - Consentement RGPD
    """
    # Si l'utilisateur est déjà connecté, redirection vers home
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        # Récupération des données du formulaire
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_confirm = request.POST.get('password_confirm')
        first_name = request.POST.get('first_name', '')
        last_name = request.POST.get('last_name', '')
        terms = request.POST.get('terms')
        gdpr = request.POST.get('gdpr')

        # Validations
        if not all([username, email, password, password_confirm]):
            messages.error(request, 'Veuillez remplir tous les champs obligatoires.')
            return render(request, 'core/register.html')

        if password != password_confirm:
            messages.error(request, 'Les mots de passe ne correspondent pas.')
            return render(request, 'core/register.html')

        if len(password) < 12:
            messages.error(request, 'Le mot de passe doit contenir au moins 12 caractères.')
            return render(request, 'core/register.html')

        if not terms or not gdpr:
            messages.error(request, 'Vous devez accepter les conditions générales et le RGPD.')
            return render(request, 'core/register.html')

        # Vérification de l'unicité
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Ce nom d\'utilisateur est déjà pris.')
            return render(request, 'core/register.html')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Cette adresse e-mail est déjà utilisée.')
            return render(request, 'core/register.html')

        # Création de l'utilisateur
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )

            messages.success(request, 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.')
            return redirect('login')

        except Exception as e:
            messages.error(request, f'Une erreur est survenue lors de la création du compte: {str(e)}')
            return render(request, 'core/register.html')

    return render(request, 'core/register.html')


# ============================================
# AUTHENTIFICATION - LOGOUT
# ============================================

@login_required
def logout_view(request):
    """
    Vue de déconnexion

    - Suppression de la session
    - Message de confirmation
    - Redirection vers la page de login
    """
    username = request.user.username
    logout(request)
    messages.info(request, f'Au revoir, {username}. Vous êtes déconnecté.')
    return redirect('login')


# ============================================
# PAGES LÉGALES (RGPD)
# ============================================

def legal_view(request):
    """
    Page des mentions légales

    - Accessible à tous (authentifié ou non)
    - Conforme aux obligations légales françaises
    """
    return render(request, 'core/legal.html')


def privacy_view(request):
    """
    Page de politique de confidentialité

    - Accessible à tous (authentifié ou non)
    - Conforme au RGPD
    """
    return render(request, 'core/privacy.html')
>>>>>>> 9d7df2e3e8052ed07f44486b78d63f1096939998
