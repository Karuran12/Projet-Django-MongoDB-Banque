from django.db import models
from django.contrib.auth.models import AbstractUser
from djongo import models as djongo_models
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    """
    Modèle utilisateur personnalisé avec support MongoDB.
    """
    _id = djongo_models.ObjectIdField(primary_key=True)  # Clé primaire pour MongoDB
    role = models.CharField(
        max_length=10,
        choices=[('USER', 'User'), ('ADMIN', 'Admin')],
        default='USER'
    )
    consent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'core_user'  # Collection MongoDB
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

    def clean(self):
        """Validation personnalisée."""
        if not self.consent and self.role != 'USER':
            raise ValidationError("Les administrateurs doivent accepter les conditions.")

class Account(models.Model):
    """
    Compte bancaire lié à un utilisateur.
    """
    _id = djongo_models.ObjectIdField(primary_key=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='account',  # Permet user.account
        verbose_name="Utilisateur"
    )
    balance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Solde"
    )
    account_number = models.CharField(
        max_length=34,
        unique=True,
        verbose_name="Numéro de compte",
        default="FR000000000000"  # Valeur par défaut temporaire
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'core_account'
        verbose_name = "Compte"
        verbose_name_plural = "Comptes"
        ordering = ['-created_at']

    def __str__(self):
        return f"Compte {self.account_number} ({self.user.username}) - {self.balance}€"

    def clean(self):
        """Empêche un solde négatif."""
        if self.balance < 0:
            raise ValidationError("Le solde ne peut pas être négatif.")

@receiver(post_save, sender=User)
def create_user_account(sender, instance, created, **kwargs):
    """
    Crée automatiquement un Account quand un User est créé.
    """
    if created:
        # Génère un numéro de compte réaliste (format IBAN français simplifié)
        account_number = f"FR76{instance._id.hex[:10].upper()}000000000000"
        Account.objects.create(
            user=instance,
            account_number=account_number,
            balance=0
        )

class Transaction(models.Model):
    """
    Transaction entre comptes.
    """
    _id = djongo_models.ObjectIdField(primary_key=True)
    sender = models.ForeignKey(
        User,
        related_name='sent_transactions',
        on_delete=models.CASCADE,
        verbose_name="Expéditeur"
    )
    receiver = models.ForeignKey(
        User,
        related_name='received_transactions',
        on_delete=models.CASCADE,
        verbose_name="Destinataire"
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Montant"
    )
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Description"
    )
    timestamp = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date"
    )
    reference = models.CharField(
        max_length=50,
        blank=True,
        verbose_name="Référence"
    )

    class Meta:
        db_table = 'core_transaction'
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.sender.username} → {self.receiver.username} : {self.amount}€ ({self.timestamp})"

    def clean(self):
        """Validation des transactions."""
        if self.sender == self.receiver:
            raise ValidationError("Un utilisateur ne peut pas s'envoyer de l'argent à lui-même.")
        if self.amount <= 0:
            raise ValidationError("Le montant doit être positif.")
        if hasattr(self.sender, 'account') and self.sender.account.balance < self.amount:
            raise ValidationError("Solde insuffisant.")
