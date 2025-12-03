# 🎨 Exemples de Templates Django - Design Banque Privée Luxe

Ce document contient des exemples de templates Django prêts à l'emploi utilisant le CSS premium.

---

## 📑 Table des matières
1. [Login Premium](#1-login-premium)
2. [Dashboard Élégant](#2-dashboard-élégant)
3. [Formulaire de Virement](#3-formulaire-de-virement)
4. [Historique des Transactions](#4-historique-des-transactions)
5. [Page Profil](#5-page-profil)
6. [Page d'Accueil](#6-page-daccueil)

---

## 1. 🔐 Login Premium

**Fichier : `templates/auth/login.html`**

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Connexion - Banque Privée{% endblock %}

{% block content %}
<div class="container">
    <div class="card">
        <!-- Colonne gauche : Formulaire -->
        <div class="left">
            <h2>Content de te revoir !</h2>
            <p>Connecte-toi pour accéder à ton espace bancaire sécurisé.</p>

            {% if messages %}
                <div class="messages">
                    {% for message in messages %}
                        <div class="message {{ message.tags }}">{{ message }}</div>
                    {% endfor %}
                </div>
            {% endif %}

            <form method="POST" action="{% url 'login' %}" autocomplete="off">
                {% csrf_token %}

                <div class="input-group">
                    <span class="icon">👤</span>
                    <input
                        type="text"
                        name="username"
                        placeholder="Nom d'utilisateur"
                        required
                        autocomplete="username"
                        aria-label="Nom d'utilisateur"
                    >
                </div>

                <div class="input-group">
                    <span class="icon">🔒</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        required
                        autocomplete="current-password"
                        aria-label="Mot de passe"
                    >
                </div>

                <label class="checkbox-label">
                    <input type="checkbox" name="remember_me">
                    Se souvenir de moi
                </label>

                {% if form.errors %}
                    <p class="error">⚠️ Identifiants incorrects. Veuillez réessayer.</p>
                {% endif %}

                <button type="submit" class="btn-primary">Se connecter</button>
            </form>

            <div class="switch-text">
                <a href="{% url 'password_reset' %}">Mot de passe oublié ?</a>
            </div>
        </div>

        <!-- Colonne droite : Design élégant -->
        <div class="right">
            <h2>Bienvenue</h2>
            <p>Votre sécurité est notre priorité absolue. Accédez à vos services bancaires de manière sécurisée.</p>
        </div>
    </div>
</div>
{% endblock %}
```

---

## 2. 📊 Dashboard Élégant

**Fichier : `templates/dashboard_user.html`**

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Tableau de bord - {{ user.username }}{% endblock %}

{% block content %}
<div class="dashboard">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
        <h2 class="logo">Djan<span>Pay</span></h2>

        <nav>
            <a href="{% url 'dashboard' %}" class="active">
                🏠 Tableau de bord
            </a>
            <a href="{% url 'account' %}">
                💰 Mon Compte
            </a>
            <a href="{% url 'transfer' %}">
                💸 Virement
            </a>
            <a href="{% url 'history' %}">
                📜 Historique
            </a>
            <a href="{% url 'profile' %}">
                👤 Profil
            </a>
        </nav>
    </aside>

    <!-- Contenu Principal -->
    <main class="main-content">
        <!-- En-tête -->
        <header class="topbar">
            <h2>Bienvenue, {{ user.username }}</h2>
            <a href="{% url 'logout' %}" class="logout-btn">
                🚪 Déconnexion
            </a>
        </header>

        <!-- Section Informations Utilisateur -->
        <section class="user-summary">
            <h3>Mes informations</h3>

            <div class="summary-grid">
                <div class="info-card">
                    <strong>👤 Nom d'utilisateur</strong>
                    <p>{{ user.username }}</p>
                </div>

                <div class="info-card">
                    <strong>📧 Email</strong>
                    <p>{{ user.email|default:"Non renseigné" }}</p>
                </div>

                <div class="info-card">
                    <strong>💼 Type de compte</strong>
                    <p>Utilisateur Premium</p>
                </div>

                <div class="info-card">
                    <strong>💳 Solde actuel</strong>
                    <p class="text-gold">{{ account.balance|floatformat:2 }} €</p>
                </div>
            </div>

            <div class="btn-group">
                <a href="{% url 'profile' %}" class="btn-primary">
                    Modifier mes informations
                </a>
                <a href="{% url 'delete_account' %}" class="btn-danger">
                    Supprimer mon compte
                </a>
            </div>
        </section>

        <!-- Actions Rapides -->
        <section class="cards">
            <div class="card quick-action">
                <h3>💸 Effectuer un virement</h3>
                <p>Transférez de l'argent rapidement et en toute sécurité</p>
                <a href="{% url 'transfer' %}" class="action-btn">
                    ➤ Commencer
                </a>
            </div>

            <div class="card quick-action">
                <h3>📜 Historique des opérations</h3>
                <p>Consultez toutes vos transactions passées</p>
                <a href="{% url 'history' %}" class="action-btn">
                    📄 Voir l'historique
                </a>
            </div>
        </section>

        <!-- Dernières Transactions (optionnel) -->
        {% if recent_transactions %}
        <section class="mt-lg">
            <h3 class="mb-md">📊 Dernières transactions</h3>

            <table class="table-history">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Destinataire</th>
                        <th>Montant</th>
                    </tr>
                </thead>
                <tbody>
                    {% for transaction in recent_transactions %}
                    <tr>
                        <td>{{ transaction.timestamp|date:"d/m/Y H:i" }}</td>
                        <td>{{ transaction.receiver.username }}</td>
                        <td class="{% if transaction.amount < 0 %}debit{% else %}credit{% endif %}">
                            {{ transaction.amount|floatformat:2 }} €
                        </td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </section>
        {% endif %}
    </main>
</div>
{% endblock %}
```

---

## 3. 💸 Formulaire de Virement

**Fichier : `templates/transfer.html`**

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Virement - DjanPay{% endblock %}

{% block content %}
<div class="transfer-container">
    <div class="transfer-card">
        <h2 class="transfer-title">💸 Effectuer un virement</h2>
        <p class="balance-text">
            Solde disponible : <strong>{{ balance|floatformat:2 }} €</strong>
        </p>

        <!-- Messages de succès/erreur -->
        {% if messages %}
            <div class="messages">
                {% for message in messages %}
                    <div class="alert {{ message.tags }}">
                        {{ message }}
                    </div>
                {% endfor %}
            </div>
        {% endif %}

        <form method="POST" autocomplete="off">
            {% csrf_token %}

            <div class="form-group">
                <label for="id_receiver_username">Destinataire (nom d'utilisateur)</label>
                {{ form.receiver_username }}
                {% if form.receiver_username.errors %}
                    <span class="error">{{ form.receiver_username.errors.0 }}</span>
                {% endif %}
            </div>

            <div class="form-group">
                <label for="id_amount">Montant (€)</label>
                {{ form.amount }}
                {% if form.amount.errors %}
                    <span class="error">{{ form.amount.errors.0 }}</span>
                {% endif %}
            </div>

            <div class="form-group">
                <label for="id_description">Description (optionnel)</label>
                {{ form.description }}
                {% if form.description.errors %}
                    <span class="error">{{ form.description.errors.0 }}</span>
                {% endif %}
            </div>

            {% if form.non_field_errors %}
                <div class="error-box">
                    <p>⚠️ Erreurs :</p>
                    {{ form.non_field_errors }}
                </div>
            {% endif %}

            <button type="submit" class="btn-primary">
                ✨ Confirmer le virement
            </button>
            <a href="{% url 'dashboard' %}" class="btn-secondary">
                ⬅ Retour au tableau de bord
            </a>
        </form>
    </div>
</div>
{% endblock %}
```

---

## 4. 📜 Historique des Transactions

**Fichier : `templates/history.html`**

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Historique des transactions{% endblock %}

{% block content %}
<div class="history-container">
    <h2>📜 Historique des transactions</h2>

    {% if transactions %}
        <table class="table-history">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Destinataire / Expéditeur</th>
                    <th>Montant</th>
                    <th>Description</th>
                    <th>Statut</th>
                </tr>
            </thead>
            <tbody>
                {% for transaction in transactions %}
                <tr>
                    <td>{{ transaction.timestamp|date:"d/m/Y H:i" }}</td>
                    <td>
                        {% if transaction.sender == user %}
                            Envoi
                        {% else %}
                            Réception
                        {% endif %}
                    </td>
                    <td>
                        {% if transaction.sender == user %}
                            → {{ transaction.receiver.username }}
                        {% else %}
                            ← {{ transaction.sender.username }}
                        {% endif %}
                    </td>
                    <td class="{% if transaction.sender == user %}debit{% else %}credit{% endif %}">
                        {% if transaction.sender == user %}-{% else %}+{% endif %}
                        {{ transaction.amount|floatformat:2 }} €
                    </td>
                    <td>{{ transaction.description|default:"-" }}</td>
                    <td>
                        <span class="badge-status badge-success">✓ Validé</span>
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>

        <!-- Pagination (optionnel) -->
        {% if is_paginated %}
        <div class="flex justify-center gap-sm mt-lg">
            {% if page_obj.has_previous %}
                <a href="?page=1" class="btn-secondary">‹‹ Première</a>
                <a href="?page={{ page_obj.previous_page_number }}" class="btn-secondary">‹ Précédent</a>
            {% endif %}

            <span class="p-md">
                Page {{ page_obj.number }} sur {{ page_obj.paginator.num_pages }}
            </span>

            {% if page_obj.has_next %}
                <a href="?page={{ page_obj.next_page_number }}" class="btn-secondary">Suivant ›</a>
                <a href="?page={{ page_obj.paginator.num_pages }}" class="btn-secondary">Dernière ››</a>
            {% endif %}
        </div>
        {% endif %}

    {% else %}
        <div class="empty-state">
            <p>Aucune transaction trouvée.</p>
            <a href="{% url 'transfer' %}" class="btn-primary mt-md">
                Effectuer votre premier virement
            </a>
        </div>
    {% endif %}

    <div class="mt-lg text-center">
        <a href="{% url 'dashboard' %}" class="btn-secondary">
            ⬅ Retour au tableau de bord
        </a>
    </div>
</div>
{% endblock %}
```

---

## 5. 👤 Page Profil

**Fichier : `templates/profile.html`**

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Mon Profil - {{ user.username }}{% endblock %}

{% block content %}
<div class="container-profile">
    <div class="card-profile">
        <h2>👤 Mon Profil</h2>

        {% if messages %}
            <div class="messages">
                {% for message in messages %}
                    <div class="alert {{ message.tags }}">{{ message }}</div>
                {% endfor %}
            </div>
        {% endif %}

        <!-- Formulaire de modification -->
        <form method="POST">
            {% csrf_token %}

            <div class="form-group">
                <label for="id_username">Nom d'utilisateur</label>
                {{ form.username }}
                {% if form.username.errors %}
                    <span class="error">{{ form.username.errors.0 }}</span>
                {% endif %}
            </div>

            <div class="form-group">
                <label for="id_email">Adresse email</label>
                {{ form.email }}
                {% if form.email.errors %}
                    <span class="error">{{ form.email.errors.0 }}</span>
                {% endif %}
            </div>

            <div class="form-group">
                <label for="id_first_name">Prénom</label>
                {{ form.first_name }}
            </div>

            <div class="form-group">
                <label for="id_last_name">Nom de famille</label>
                {{ form.last_name }}
            </div>

            <button type="submit" class="btn-primary">
                💾 Enregistrer les modifications
            </button>
        </form>

        <!-- Changement de mot de passe -->
        <div class="mt-lg">
            <h3 class="mb-md">🔒 Sécurité</h3>
            <a href="{% url 'password_change' %}" class="btn-secondary">
                Changer mon mot de passe
            </a>
        </div>

        <!-- Retour -->
        <div class="mt-lg text-center">
            <a href="{% url 'dashboard' %}" class="btn-secondary">
                ⬅ Retour au tableau de bord
            </a>
        </div>
    </div>
</div>
{% endblock %}
```

---

## 6. 🏠 Page d'Accueil

**Fichier : `templates/home.html`**

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Accueil - Banque Privée Luxe{% endblock %}

{% block content %}
<div class="container mt-lg">
    <header class="text-center mb-lg">
        <h1 class="text-gold">Banque Privée Luxe</h1>
        <p class="mt-md">
            Une expérience bancaire premium, sécurisée et élégante
        </p>
    </header>

    <!-- Cartes de présentation -->
    <div class="cards">
        <div class="card">
            <h3>🏦 Gestion de compte</h3>
            <p>Gérez votre compte bancaire avec une interface intuitive et sécurisée.</p>
        </div>

        <div class="card">
            <h3>💸 Virements instantanés</h3>
            <p>Effectuez des virements rapidement vers vos bénéficiaires de confiance.</p>
        </div>

        <div class="card">
            <h3>📊 Suivi en temps réel</h3>
            <p>Consultez l'historique complet de vos transactions à tout moment.</p>
        </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center mt-xl">
        {% if user.is_authenticated %}
            <a href="{% url 'dashboard' %}" class="btn-primary">
                Accéder à mon espace
            </a>
        {% else %}
            <a href="{% url 'login' %}" class="btn-primary">
                Se connecter
            </a>
            <a href="{% url 'register' %}" class="btn-secondary ml-md">
                Créer un compte
            </a>
        {% endif %}
    </div>

    <!-- Fonctionnalités -->
    <section class="mt-xl">
        <h2 class="text-center mb-lg">✨ Pourquoi nous choisir ?</h2>

        <div class="summary-grid">
            <div class="info-card">
                <strong>🔒 Sécurité maximale</strong>
                <p>Vos données sont protégées par un chiffrement de niveau bancaire</p>
            </div>

            <div class="info-card">
                <strong>⚡ Transactions instantanées</strong>
                <p>Virements traités en temps réel, 24h/24 et 7j/7</p>
            </div>

            <div class="info-card">
                <strong>📱 Interface moderne</strong>
                <p>Design élégant et responsive sur tous vos appareils</p>
            </div>

            <div class="info-card">
                <strong>🌍 Disponibilité totale</strong>
                <p>Accédez à votre compte depuis n'importe où dans le monde</p>
            </div>
        </div>
    </section>
</div>
{% endblock %}
```

---

## 📝 Base Template

**Fichier : `templates/base.html`**

```django
{% load static %}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Banque Privée Luxe - Gestion de compte bancaire premium">
    <meta name="csrf-token" content="{{ csrf_token }}">

    <title>{% block title %}Banque Privée{% endblock %}</title>

    <!-- CSS Principal -->
    <link rel="stylesheet" href="{% static 'css/style.css' %}">

    <!-- CSS Supplémentaire (optionnel) -->
    {% block extra_css %}{% endblock %}

    <!-- Favicon (optionnel) -->
    <link rel="icon" type="image/png" href="{% static 'images/favicon.png' %}">
</head>

<body>
    <main>
        {% block content %}{% endblock %}
    </main>

    <!-- Footer -->
    <footer>
        <a href="{% url 'mentions_legales' %}">Mentions légales</a> |
        <a href="{% url 'politique_confidentialite' %}">Politique de Confidentialité</a> |
        <a href="{% url 'conditions_generales' %}">CGU</a>
        <br>
        <small>&copy; 2025 Banque Privée Luxe - Tous droits réservés</small>
    </footer>

    <!-- JavaScript (optionnel) -->
    {% block extra_js %}{% endblock %}
</body>
</html>
```

---

## 🎯 Page 404 Personnalisée

**Fichier : `templates/404.html`**

```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Page non trouvée - Erreur 404{% endblock %}

{% block content %}
<div class="container-profile">
    <div class="card-profile text-center">
        <h1 style="font-size: 5rem;">404</h1>
        <h2>Page non trouvée</h2>
        <p class="mt-md mb-lg">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div class="empty-state">
            <p>Que souhaitez-vous faire ?</p>
        </div>

        <div class="btn-group flex justify-center">
            <a href="{% url 'dashboard' %}" class="btn-primary">
                🏠 Tableau de bord
            </a>
            <a href="javascript:history.back()" class="btn-secondary">
                ⬅ Page précédente
            </a>
        </div>
    </div>
</div>
{% endblock %}
```

---

## 🔧 Conseils d'intégration

### 1. Formulaires Django

Pour que vos formulaires Django héritent automatiquement des styles :

```python
# forms.py
from django import forms

class TransferForm(forms.Form):
    receiver_username = forms.CharField(
        widget=forms.TextInput(attrs={
            'placeholder': 'Nom du destinataire',
            'class': 'form-control'  # Optionnel
        })
    )
    amount = forms.DecimalField(
        widget=forms.NumberInput(attrs={
            'placeholder': '0.00',
            'step': '0.01'
        })
    )
```

### 2. Messages Django

Dans `settings.py`, ajoutez :

```python
from django.contrib.messages import constants as messages

MESSAGE_TAGS = {
    messages.DEBUG: 'debug',
    messages.INFO: 'info',
    messages.SUCCESS: 'success',
    messages.WARNING: 'warning',
    messages.ERROR: 'error',
}
```

### 3. Static Files

Assurez-vous que dans `settings.py` :

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'core/static']
```

---

**Ces templates sont prêts à l'emploi et utilisent toutes les fonctionnalités du CSS premium ! 🎨✨**
