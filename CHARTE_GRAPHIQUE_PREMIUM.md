# 🏛️ CHARTE GRAPHIQUE DJANPAY - BANQUE PRIVÉE PREMIUM

## 🎨 PALETTE DE COULEURS

### Couleurs Principales
```css
--primary-dark: #0A1929        /* Bleu nuit profond - Élégance & Autorité */
--primary-blue: #1A2F42        /* Bleu marine - Confiance */
--secondary-gold: #C9A55A      /* Or élégant - Prestige */
--accent-gold: #D4AF37         /* Or lumineux - Luxe */
```

### Couleurs Neutres
```css
--white: #FFFFFF               /* Blanc pur */
--ivory: #FAF9F6               /* Blanc cassé - Douceur */
--cream: #F5F3EE               /* Crème - Chaleur */
--beige-light: #E8E6E1         /* Beige clair - Sobriété */
--beige: #D4D2CD               /* Beige - Neutralité */
--grey-light: #C4C4C4          /* Gris clair */
--grey: #7A7A7A                /* Gris moyen */
--anthracite: #3A3A3A          /* Gris anthracite - Sérieux */
--charcoal: #2C2C2C            /* Charbon - Profondeur */
```

### Couleurs Fonctionnelles
```css
--success: #4A7C59             /* Vert discret */
--error: #8B4049               /* Rouge discret */
--warning: #9A7B4F             /* Brun doré */
--info: #5B7C99                /* Bleu pâle */
```

### Dégradés Premium
```css
--gradient-gold: linear-gradient(135deg, #C9A55A 0%, #D4AF37 50%, #B8935E 100%)
--gradient-blue: linear-gradient(135deg, #0A1929 0%, #1A2F42 100%)
--gradient-elegant: linear-gradient(135deg, #FAF9F6 0%, #F5F3EE 100%)
```

---

## 📝 TYPOGRAPHIE

### Police Principale
**Cormorant Garamond** (Serif élégante)
- Titres H1: 48px - Weight 600 - Letter-spacing: -0.5px
- Titres H2: 36px - Weight 600 - Letter-spacing: -0.3px
- Titres H3: 28px - Weight 500
- Sous-titres: 20px - Weight 500

### Police Secondaire
**Lato** (Sans-serif moderne)
- Corps de texte: 16px - Weight 400 - Line-height: 1.6
- Boutons: 14px - Weight 600 - Letter-spacing: 1px (uppercase)
- Labels: 14px - Weight 500

### Hiérarchie Typographique
```
H1 → 48px / 600 / Cormorant Garamond (titres principaux)
H2 → 36px / 600 / Cormorant Garamond (sections)
H3 → 28px / 500 / Cormorant Garamond (sous-sections)
H4 → 22px / 500 / Lato (éléments importants)
Body → 16px / 400 / Lato (texte courant)
Small → 14px / 400 / Lato (notes, légendes)
```

---

## 🎯 PRINCIPES DE DESIGN

### 1. ESPACE BLANC (Respiration)
- **Padding généreux**: 40-60px sur desktop, 24-32px sur mobile
- **Marges verticales**: 80-120px entre sections
- **Line-height**: 1.6 minimum pour la lisibilité

### 2. COINS ARRONDIS (Élégance)
- Cards: `border-radius: 12px`
- Boutons: `border-radius: 8px`
- Inputs: `border-radius: 8px`
- Modales: `border-radius: 16px`

### 3. OMBRES (Profondeur subtile)
```css
--shadow-sm: 0 2px 4px rgba(10, 25, 41, 0.04)
--shadow-md: 0 4px 12px rgba(10, 25, 41, 0.08)
--shadow-lg: 0 8px 24px rgba(10, 25, 41, 0.12)
--shadow-xl: 0 12px 40px rgba(10, 25, 41, 0.16)
```

### 4. BORDURES (Finesse)
- Épaisseur: 1px maximum
- Couleur: rgba(201, 165, 90, 0.2) pour les accents dorés
- Couleur: rgba(10, 25, 41, 0.1) pour les séparations neutres

---

## 🔘 COMPOSANTS

### Boutons Primaires (Actions principales)
```css
Background: var(--gradient-gold)
Color: var(--primary-dark)
Padding: 14px 32px
Font: Lato 14px Weight 600
Border-radius: 8px
Transition: all 0.3s ease
Hover: transform: translateY(-2px) + shadow-lg
```

### Boutons Secondaires (Actions secondaires)
```css
Background: transparent
Border: 1px solid var(--secondary-gold)
Color: var(--primary-dark)
Padding: 14px 32px
Hover: background: rgba(201, 165, 90, 0.1)
```

### Boutons Tertiaires (Liens)
```css
Background: transparent
Color: var(--secondary-gold)
Text-decoration: underline on hover
Transition: opacity 0.3s
```

### Cards (Conteneurs)
```css
Background: white
Border: 1px solid rgba(10, 25, 41, 0.08)
Border-radius: 12px
Padding: 40px
Box-shadow: var(--shadow-md)
```

### Inputs (Formulaires)
```css
Background: var(--ivory)
Border: 1px solid var(--beige-light)
Border-radius: 8px
Padding: 14px 18px
Font: Lato 16px
Focus: border-color: var(--secondary-gold)
```

---

## ✨ ANIMATIONS

### Transitions Standards
```css
--transition-fast: 0.2s ease
--transition-normal: 0.3s ease
--transition-slow: 0.5s ease
```

### Animations Premium
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide In */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Scale Hover */
.hover-scale {
  transition: transform 0.3s ease;
}
.hover-scale:hover {
  transform: scale(1.02);
}
```

### Effets au Scroll
- Fade in progressif
- Parallax subtil sur les backgrounds
- Sticky navbar avec shadow au scroll

---

## 📐 GRILLE & RESPONSIVE

### Breakpoints
```css
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1439px
Large Desktop: 1440px+
```

### Conteneurs
```css
Max-width: 1200px (desktop)
Max-width: 960px (tablette)
Padding: 24px (mobile)
Padding: 40px (desktop)
```

### Grille
```css
Desktop: Grid 3 colonnes (gap 32px)
Tablet: Grid 2 colonnes (gap 24px)
Mobile: Grid 1 colonne (gap 20px)
```

---

## 🏷️ BADGES & TAGS

### Badge Admin (Rouge discret)
```css
Background: rgba(139, 64, 73, 0.1)
Border: 1px solid #8B4049
Color: #8B4049
Padding: 6px 16px
Border-radius: 20px
Font: Lato 12px Weight 600
```

### Badge User (Vert discret)
```css
Background: rgba(74, 124, 89, 0.1)
Border: 1px solid #4A7C59
Color: #4A7C59
Padding: 6px 16px
Border-radius: 20px
Font: Lato 12px Weight 600
```

---

## 🎭 ICONOGRAPHIE

### Style d'icônes
- **Ligne fine** (stroke-width: 1.5px)
- **Taille standard**: 24px
- **Couleur**: var(--anthracite) ou var(--secondary-gold)
- **Format**: SVG ou Font Awesome (light/regular)

### Icônes recommandées (Font Awesome)
```
🏦 Accueil: fa-home-lg
💰 Compte: fa-wallet
💸 Transfert: fa-exchange-alt
📊 Stats: fa-chart-line
👤 Profil: fa-user-circle
🔒 Sécurité: fa-shield-check
⚙️ Settings: fa-cog
🚪 Logout: fa-sign-out-alt
```

---

## 📱 RESPONSIVE DESIGN

### Principes Mobile-First
1. Contenu prioritaire visible sans scroll
2. Navigation simplifiée (burger menu)
3. Formulaires optimisés (grands inputs tactiles)
4. Boutons suffisamment grands (min 44px hauteur)
5. Images optimisées (lazy loading)

### Adaptations
```
Mobile:
- Font-size réduit de 20%
- Padding réduit de 30%
- Grille 1 colonne
- Menu burger

Tablet:
- Font-size réduit de 10%
- Grille 2 colonnes
- Navigation condensée

Desktop:
- Taille complète
- Grille 3-4 colonnes
- Navigation étendue
```

---

## 🎨 AMBIANCE VISUELLE

### Atmosphère
- **Élégante** sans ostentation
- **Sobre** mais luxueuse
- **Rassurante** et professionnelle
- **Moderne** tout en étant intemporelle

### Moodboard Inspirations
- Banques privées suisses
- Marques de luxe discrètes (Hermès, Cartier)
- Architecture contemporaine minimaliste
- Matériaux nobles (marbre, or, bois précieux)

---

## ✅ CHECKLIST QUALITÉ

### Accessibilité
- [ ] Contraste minimum 4.5:1 (WCAG AA)
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Labels explicites sur les formulaires
- [ ] Textes alternatifs sur les images

### Performance
- [ ] CSS minifié
- [ ] Images optimisées (WebP)
- [ ] Lazy loading activé
- [ ] Fonts en subset

### SEO
- [ ] Balises sémantiques HTML5
- [ ] Meta descriptions
- [ ] Structured data
- [ ] Open Graph tags

---

## 📄 EXEMPLES D'APPLICATION

### Page d'accueil
- Header fixe transparent → opaque au scroll
- Hero section avec titre élégant + CTA doré
- Cards de fonctionnalités en grille
- Section témoignages avec citations stylisées
- Footer sobre avec liens légaux

### Page de connexion
- Formulaire centré sur fond dégradé subtil
- Card blanche avec ombre élégante
- Inputs épurés avec labels flottants
- Bouton CTA doré proéminent
- Liens discrets (mot de passe oublié, inscription)

### Dashboard
- Sidebar élégante avec navigation
- Header avec recherche et profil
- Cards de statistiques avec icônes fines
- Graphiques minimalistes
- Tableau de données épuré

---

**© 2025 DjanPay - Banque Privée Premium**
