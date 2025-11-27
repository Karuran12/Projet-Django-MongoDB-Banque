from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db import transaction as db_transaction

from .forms import TransferForm
from .models import User, Account, Transaction


def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("home")
        else:
            messages.error(request, "Identifiants invalides.")
    else:
        form = AuthenticationForm(request)

    return render(request, "auth/login.html", {"form": form})


@login_required
def logout_view(request):
    logout(request)
    messages.info(request, "Vous avez été déconnecté.")
    return redirect("login")


@login_required
def home_view(request):
    username = request.user.username
    is_admin = request.user.is_staff

    return render(request, "home.html", {
        "username": username,
        "is_admin": is_admin,
        "user_role": "Administrateur" if is_admin else "Utilisateur"
    })


@login_required
def dashboard_view(request):
    username = request.user.username
    is_admin = request.user.is_staff

    return render(request, "dashboard.html", {
        "username": username,
        "is_admin": is_admin,
        "user_role": "Administrateur" if is_admin else "Utilisateur"
    })


@login_required
def transfer_view(request):
    """
    Vue de virement :
    - protégée par login_required
    - protégée CSRF via {% csrf_token %} dans le template
    - vérifie que le compte source appartient à l'utilisateur connecté
    """
    sender = request.user
    sender_account = get_object_or_404(Account, user=sender)

    if request.method == "POST":
        form = TransferForm(request.POST, user=request.user)
        if form.is_valid():
            receiver_username = form.cleaned_data["receiver_username"]
            amount = form.cleaned_data["amount"]
            description = form.cleaned_data["description"]

            receiver = get_object_or_404(User, username=receiver_username)
            receiver_account = get_object_or_404(Account, user=receiver)

            if sender_account.balance < amount:
                messages.error(request, "Solde insuffisant pour effectuer ce virement.")
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
                )

            messages.success(request, "Virement effectué avec succès.")
            return redirect("home")
    else:
        form = TransferForm(user=request.user)

    return render(request, "transfer.html", {
        "form": form,
        "balance": sender_account.balance,
    })
