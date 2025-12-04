# 💼 Projet Banque - Django & MongoDB

Ce projet est une application bancaire développée avec **Django**, utilisant **MongoDB** comme base de données.  
Il permet la gestion de comptes, transactions, utilisateurs, et opérations bancaires.

---

## 📥 Installation du projet

### 1️⃣ Cloner le projet depuis GitHub
```bash
git clone https://github.com/Karuran12/Projet-Django-MongoDB-Banque.git
```

---

### 2️⃣ 📂 Se placer dans la **racine du projet**
> La racine est le dossier principal du projet (là où vous avez le dossier `bank_projects/`, mais **pas encore dedans**).

```bash
cd Projet-Django-MongoDB-Banque
```

---

### 3️⃣ 🛠️ Créer l’environnement virtuel *(dans la racine, et non dans `bank_projects/`)*
🔹 **Mac / Linux :**
```bash
python3 -m venv venv
source venv/bin/activate
```

🔹 **Windows :**
```bash
python -m venv venv
venv\Scripts\activate
```

---

### 4️⃣ 📦 Installer les dépendances
```bash
pip install -r bank_projects/requirements.txt
```

Ou en cas de problème :
```bash
pip install django djongo pymongo python-dotenv
```

---

### 5️⃣ ⚙️ Configuration des variables d’environnement  
👉 **Créer le fichier `.env` dans le dossier `bank_projects/`** (au même niveau que `manage.py`) :

// REGARDER LE FICHIER .env.example
```env
DJANGO_SECRET_KEY=une_grosse_cle_ultra_secrete

DJANGO_DEBUG=True

DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
 
MONGODB_NAME=djanpay

MONGODB_HOST=localhost

MONGODB_PORT=27017

```

---

### 6️⃣ 🛠️ Appliquer les migrations  
> Maintenant, entrez dans **bank_projects/**
```bash
cd bank_projects
python manage.py makemigrations
python manage.py migrate
```

---

### 7️⃣ 🚀 Lancer le serveur Django
```bash
python manage.py runserver
```

Accédez ensuite :  
👉 http://127.0.0.1:8000/

---

## ⚙️ Technologies utilisées

| Technologie | Rôle |
|-------------|------|
| Django | Framework backend |
| MongoDB | Base de données NoSQL |
| Djongo | Connecteur MongoDB pour Django ORM |
| PyMongo | Communication directe avec MongoDB |
| Python-dotenv | Gestion des variables d’environnement |

---

## 📌 Structure du projet
```
Projet-Django-MongoDB-Banque/
│
├── venv/                     # Environnement virtuel (racine)
├── bank_projects/
│   ├── bank/                 # Application bancaire
│   ├── bank_project/         # Configuration Django
│   ├── manage.py             # Point d’entrée du projet
│   └── .env                  # Variables d’environnement
│
└── requirements.txt          # Dépendances Python
```

---

## 👨‍💻 Auteur

👤 **Karuran12**  
📎 GitHub : https://github.com/Karuran12  
🌍 Projet open-source — contributions bienvenues !

---

## 📄 Licence

Ce projet est soumis à la licence **MIT** — libre d’utilisation, modification et distribution.

---

✨ *N’hésitez pas à étoiler le repo GitHub si le projet vous a été utile !*

nos mdp prenom cest nos prenom1234!

pour la connexion admin mettre un tutoriel avec le superuser 

unzip export_bdd.zip -d ~/

cd ~/export_bdd/djanpay

mongorestore --db=djanpay --dir=.