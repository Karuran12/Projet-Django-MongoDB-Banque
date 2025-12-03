# 🏛️ Guide d'Utilisation - CSS Banque Privée Luxe

## 📋 Table des matières
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Variables CSS](#variables-css)
4. [Composants](#composants)
5. [Exemples d'utilisation](#exemples-dutilisation)
6. [Responsive Design](#responsive-design)
7. [Accessibilité](#accessibilité)

---

## 🎯 Introduction

Ce CSS premium offre un design haut de gamme inspiré des plus grandes banques privées mondiales : Rothschild & Co, JP Morgan Private Bank, UBS Wealth Management.

### Caractéristiques principales :
- ✨ **Palette luxueuse** : Or (#D4AF37), Noir profond (#0A0E27), Blanc cassé (#F8F9FA)
- 🎨 **Glassmorphism** : Effets de transparence et flou sophistiqués
- 🌊 **Animations fluides** : Transitions subtiles et professionnelles
- 📱 **Responsive** : Adaptation parfaite mobile, tablette, desktop
- ♿ **Accessible** : Conforme WCAG AA

---

## 🚀 Installation

### 1. Intégration dans Django

Ajoutez dans votre template `base.html` :

```html
{% load static %}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Banque Privée{% endblock %}</title>

    <!-- CSS Principal -->
    <link rel="stylesheet" href="{% static 'css/style.css' %}">

    <!-- Dashboard CSS (optionnel, pour pages spécifiques) -->
    {% block extra_css %}{% endblock %}
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
```

### 2. Polices Google Fonts

Les polices sont déjà importées dans le CSS :
- **Playfair Display** : Pour les titres élégants
- **Inter** : Pour le texte courant moderne

---

## 🎨 Variables CSS

Toutes les couleurs et espacements sont définis en variables CSS pour faciliter la maintenance.

### Palette de couleurs

```css
/* Couleurs principales */
--color-primary-dark: #0A0E27;        /* Fond noir profond */
--color-gold: #D4AF37;                /* Or classique */
--color-gold-light: #E8C968;          /* Or clair */
--color-gold-dark: #B8941F;           /* Or foncé */
--color-off-white: #F8F9FA;           /* Blanc cassé */

/* Couleurs système */
--color-success: #2ECC71;             /* Vert succès */
--color-error: #E74C3C;               /* Rouge erreur */
--color-warning: #F39C12;             /* Orange alerte */
```

### Espacements

```css
--spacing-xs: 0.5rem;     /* 8px */
--spacing-sm: 1rem;       /* 16px */
--spacing-md: 1.5rem;     /* 24px */
--spacing-lg: 2rem;       /* 32px */
--spacing-xl: 3rem;       /* 48px */
--spacing-2xl: 4rem;      /* 64px */
```

### Modifier les variables

Pour personnaliser, ajoutez dans votre CSS :

```css
:root {
  --color-gold: #FFD700;  /* Or plus brillant */
  --spacing-lg: 2.5rem;   /* Espacement plus grand */
}
```

---

## 🧩 Composants

### 1. 🔐 Bouton Principal (Call-to-Action)

Bouton doré avec effet "shine" au survol.

```html
<button class="btn-primary">Se connecter</button>
<a href="#" class="btn-primary">Effectuer un virement</a>
```

**Variantes :**
```html
<button class="btn-secondary">Annuler</button>
<button class="btn-danger">Supprimer le compte</button>
```

---

### 2. 📦 Cartes (Cards)

Cartes avec glassmorphism et effet hover élégant.

```html
<div class="info-card">
    <strong>💳 Solde actuel</strong>
    <p>12 500,00 €</p>
</div>
```

**Grid de cartes :**
```html
<div class="summary-grid">
    <div class="info-card">
        <strong>👤 Nom d'utilisateur</strong>
        <p>Jean Dupont</p>
    </div>
    <div class="info-card">
        <strong>📧 Email</strong>
        <p>jean.dupont@example.com</p>
    </div>
    <div class="info-card">
        <strong>💼 Type de compte</strong>
        <p>Privé Premium</p>
    </div>
</div>
```

---

### 3. 📝 Formulaires Élégants

Inputs avec bordures dorées au focus.

```html
<form class="transfer-card">
    <h2 class="transfer-title">💸 Effectuer un virement</h2>
    <p class="balance-text">Solde disponible : <strong>12 500 €</strong></p>

    <div class="form-group">
        <label>Destinataire</label>
        <input type="text" placeholder="Nom d'utilisateur" name="receiver">
    </div>

    <div class="form-group">
        <label>Montant (€)</label>
        <input type="number" placeholder="0.00" name="amount">
    </div>

    <div class="form-group">
        <label>Description (optionnel)</label>
        <textarea placeholder="Motif du virement"></textarea>
    </div>

    <button type="submit" class="btn-primary">Confirmer</button>
    <a href="{% url 'dashboard' %}" class="btn-secondary">Retour</a>
</form>
```

---

### 4. 📊 Tableaux Premium

Tableau avec alternance de lignes et hover effect.

```html
<div class="history-container">
    <h2>📜 Historique des transactions</h2>

    <table class="table-history">
        <thead>
            <tr>
                <th>Date</th>
                <th>Destinataire</th>
                <th>Montant</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>01/12/2025 14:30</td>
                <td>Marie Martin</td>
                <td class="credit">+500,00 €</td>
                <td>Remboursement</td>
            </tr>
            <tr>
                <td>30/11/2025 09:15</td>
                <td>Pierre Durand</td>
                <td class="debit">-150,00 €</td>
                <td>Facture électricité</td>
            </tr>
        </tbody>
    </table>
</div>
```

**Classes de montants :**
- `.credit` ou `.amount-positive` : Montant positif (vert)
- `.debit` ou `.amount-negative` : Montant négatif (rouge)

---

### 5. 🚨 Messages & Alertes

Alertes stylisées pour feedback utilisateur.

```html
<!-- Succès -->
<div class="alert success">
    ✅ Virement effectué avec succès !
</div>

<!-- Erreur -->
<div class="alert error">
    ❌ Solde insuffisant pour effectuer ce virement.
</div>

<!-- Avertissement -->
<div class="alert warning">
    ⚠️ Votre compte sera débité dans 24h.
</div>
```

**Ancien format (Django messages) :**
```html
{% if messages %}
    <div class="messages">
        {% for message in messages %}
            <div class="message {{ message.tags }}">
                {{ message }}
            </div>
        {% endfor %}
    </div>
{% endif %}
```

---

### 6. 🧭 Navigation Latérale (Sidebar)

Sidebar fixe avec liens de navigation.

```html
<aside class="sidebar">
    <h2 class="logo">Djan<span>Pay</span></h2>

    <nav>
        <a href="{% url 'dashboard' %}" class="active">🏠 Tableau de bord</a>
        <a href="{% url 'account' %}">💰 Mon Compte</a>
        <a href="{% url 'transfer' %}">💸 Virement</a>
        <a href="{% url 'history' %}">📜 Historique</a>
        <a href="{% url 'profile' %}">👤 Profil</a>
    </nav>
</aside>
```

**Classe active :**
Ajoutez `.active` au lien actif pour le mettre en surbrillance.

---

### 7. 🎯 Boutons d'Action

Boutons avec effet shine premium.

```html
<div class="cards">
    <div class="card quick-action">
        <h3>💸 Effectuer un virement</h3>
        <a href="{% url 'transfer' %}" class="action-btn">➤ Commencer</a>
    </div>

    <div class="card quick-action">
        <h3>📜 Historique</h3>
        <a href="{% url 'history' %}" class="action-btn">📄 Voir</a>
    </div>
</div>
```

---

## 💡 Exemples d'Utilisation

### Page Login Complète

```html
{% extends 'base.html' %}
{% load static %}

{% block title %}Connexion{% endblock %}

{% block content %}
<div class="container">
    <div class="card">
        <div class="left">
            <h2>Content de te revoir !</h2>
            <p>Connecte-toi pour accéder à ton espace bancaire sécurisé.</p>

            <form method="POST">
                {% csrf_token %}

                <div class="input-group">
                    <span class="icon">👤</span>
                    <input type="text" name="username" placeholder="Nom d'utilisateur" required>
                </div>

                <div class="input-group">
                    <span class="icon">🔒</span>
                    <input type="password" name="password" placeholder="Mot de passe" required>
                </div>

                <button type="submit" class="btn-primary">Se connecter</button>
            </form>
        </div>

        <div class="right">
            <h2>Bienvenue</h2>
            <p>Votre sécurité est notre priorité. Accédez à vos services bancaires.</p>
        </div>
    </div>
</div>
{% endblock %}
```

### Dashboard avec Sidebar

```html
{% extends 'base.html' %}
{% load static %}

{% block content %}
<div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
        <h2 class="logo">Djan<span>Pay</span></h2>
        <nav>
            <a href="{% url 'dashboard' %}" class="active">🏠 Tableau de bord</a>
            <a href="{% url 'transfer' %}">💸 Virement</a>
            <a href="{% url 'history' %}">📜 Historique</a>
            <a href="{% url 'profile' %}">👤 Profil</a>
        </nav>
    </aside>

    <!-- Contenu principal -->
    <main class="main-content">
        <header class="topbar">
            <h2>Bienvenue, {{ user.username }}</h2>
            <a href="{% url 'logout' %}" class="logout-btn">🚪 Déconnexion</a>
        </header>

        <div class="summary-grid">
            <div class="info-card">
                <strong>💳 Solde actuel</strong>
                <p>{{ account.balance }} €</p>
            </div>
            <!-- Autres cartes... -->
        </div>
    </main>
</div>
{% endblock %}
```

---

## 📱 Responsive Design

Le CSS est **mobile-first** et s'adapte automatiquement.

### Breakpoints

```css
/* Tablets : max-width 1024px */
- Sidebar réduite à 240px
- Grid 2 colonnes

/* Mobile : max-width 768px */
- Sidebar cachée (à gauche)
- Grid 1 colonne
- Boutons full-width

/* Petit mobile : max-width 480px */
- Textes réduits
- Espacement compact
```

### Tester la responsivité

```html
<!-- Bouton menu mobile (à ajouter si besoin) -->
<button class="menu-toggle" onclick="toggleSidebar()">☰</button>

<script>
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}
</script>
```

---

## ♿ Accessibilité

Le CSS respecte les normes **WCAG AA**.

### Fonctionnalités incluses :

1. **Focus visible** : Bordure dorée au focus clavier
2. **Contrastes élevés** : Ratios conformes WCAG
3. **Réduction de mouvement** : Support `prefers-reduced-motion`
4. **Mode contraste élevé** : Support `prefers-contrast: high`

### Exemple navigation clavier :

```html
<button class="btn-primary" aria-label="Effectuer un virement">
    Virement
</button>
```

---

## 🎨 Classes Utilitaires

Utilisez ces classes pour des ajustements rapides :

```html
<!-- Alignement texte -->
<p class="text-center">Texte centré</p>
<p class="text-right">Texte à droite</p>

<!-- Marges -->
<div class="mt-lg mb-md">Contenu espacé</div>

<!-- Texte doré -->
<h1 class="text-gold">Titre avec dégradé or</h1>

<!-- Flexbox -->
<div class="flex items-center gap-md">
    <span>Item 1</span>
    <span>Item 2</span>
</div>

<!-- Visibilité -->
<div class="hidden">Masqué</div>
```

---

## 🎭 Animations Incluses

### 1. Fade-in au chargement

Tous les `.container`, `.card`, `.info-card` ont une animation d'entrée fluide.

### 2. Effet Shine sur boutons

Les `.btn-primary` et `.action-btn` ont un effet de brillance au survol.

### 3. Shimmer sur texte doré

Les textes avec `.text-gold` ont une animation scintillante subtile.

### 4. Loading State

```html
<button class="btn-primary loading">Chargement...</button>
```

### 5. Empty State

```html
<div class="empty-state">
    <p>Aucune transaction trouvée</p>
</div>
```

---

## 🛠️ Personnalisation Avancée

### Changer la couleur principale

```css
/* Ajouter dans un fichier custom.css */
:root {
    --color-gold: #FFD700;           /* Or plus vif */
    --color-primary-dark: #1A1A2E;   /* Fond plus clair */
}
```

### Ajouter un dégradé personnalisé

```css
.custom-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

---

## 📞 Support & Questions

Pour toute question sur l'utilisation du CSS :
- Consultez la documentation Django : [docs.djangoproject.com](https://docs.djangoproject.com)
- Vérifiez les commentaires dans `style.css`
- Testez les exemples de ce guide

---

## 🏆 Checklist de Mise en Œuvre

- [ ] Fichier `style.css` placé dans `static/css/`
- [ ] Import dans `base.html`
- [ ] Polices Google Fonts chargées
- [ ] Templates mis à jour avec les bonnes classes
- [ ] Test responsive (mobile, tablette, desktop)
- [ ] Vérification accessibilité clavier
- [ ] Test des animations

---

**Design créé avec ❤️ pour votre application bancaire premium**

*Inspiré de Rothschild & Co, JP Morgan Private Bank, UBS Wealth Management*
