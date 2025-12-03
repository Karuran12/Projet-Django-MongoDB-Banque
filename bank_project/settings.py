from pathlib import Path
<<<<<<< HEAD
import os
from dotenv import load_dotenv
=======
from decouple import config, Csv
>>>>>>> 9d7df2e3e8052ed07f44486b78d63f1096939998

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(os.path.join(BASE_DIR, '.env'))

<<<<<<< HEAD
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

DEBUG = os.getenv("DJANGO_DEBUG", "True") == "True"

ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "").split(",")

if not DEBUG:
    ALLOWED_HOSTS = ['127.0.0.1', 'localhost']
=======
# ============================================
# SÉCURITÉ - Variables d'Environnement
# ============================================

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='django-insecure-change-me-in-production')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=Csv())
>>>>>>> 9d7df2e3e8052ed07f44486b78d63f1096939998


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

<<<<<<< HEAD
    'core',
=======
    # Applications personnalisées
    'core',  # Application principale de DjanPay
>>>>>>> 9d7df2e3e8052ed07f44486b78d63f1096939998
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'core.middleware.SecurityHeadersMiddleware',  # Headers de sécurité personnalisés
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SAMESITE = "Lax"

ROOT_URLCONF = 'bank_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'bank_project.wsgi.application'

DATABASES = {
    "default": {
        "ENGINE": "djongo",
        "NAME": os.getenv("MONGODB_NAME", "djanpay"),
        "HOST": os.getenv("MONGODB_HOST", "localhost"),
        "PORT": int(os.getenv("MONGODB_PORT", 27017)),
    }
}

AUTH_PASSWORD_VALIDATORS = [
<<<<<<< HEAD
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
=======
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 12,  # Minimum 12 caractères (requis par audit sécurité)
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
>>>>>>> 9d7df2e3e8052ed07f44486b78d63f1096939998
]

LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Europe/Paris'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]

LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/dashboard/'
LOGOUT_REDIRECT_URL = '/login/'

<<<<<<< HEAD
AUTH_USER_MODEL = 'core.User'
=======
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files (uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field
>>>>>>> 9d7df2e3e8052ed07f44486b78d63f1096939998

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ============================================
# CONFIGURATION DE L'AUTHENTIFICATION
# ============================================

# Redirection après login/logout
LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/login/'

# ============================================
# CONFIGURATION DES MESSAGES
# ============================================

from django.contrib.messages import constants as messages

MESSAGE_TAGS = {
    messages.DEBUG: 'info',
    messages.INFO: 'info',
    messages.SUCCESS: 'success',
    messages.WARNING: 'warning',
    messages.ERROR: 'error',
}

# ============================================
# SÉCURITÉ DES SESSIONS & COOKIES
# ============================================

# Durée de session : 30 minutes (1800 secondes)
SESSION_COOKIE_AGE = config('SESSION_COOKIE_AGE', default=1800, cast=int)

# Renouvelle la session à chaque requête
SESSION_SAVE_EVERY_REQUEST = config('SESSION_SAVE_EVERY_REQUEST', default=True, cast=bool)

# Cookie de session accessible uniquement via HTTP (pas JavaScript)
SESSION_COOKIE_HTTPONLY = config('SESSION_COOKIE_HTTPONLY', default=True, cast=bool)

# Cookie de session transmis uniquement en HTTPS (True en production)
SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', default=False, cast=bool)

# Protection CSRF : cookie HTTPS uniquement (True en production)
CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', default=False, cast=bool)

# Cookie de session limité au même site (protection CSRF)
SESSION_COOKIE_SAMESITE = config('SESSION_COOKIE_SAMESITE', default='Strict')
CSRF_COOKIE_SAMESITE = config('CSRF_COOKIE_SAMESITE', default='Strict')

# Cookie CSRF accessible uniquement via HTTP
CSRF_COOKIE_HTTPONLY = True

# Nom du cookie de session (obfuscation)
SESSION_COOKIE_NAME = 'djanpay_sessionid'
CSRF_COOKIE_NAME = 'djanpay_csrftoken'

# ============================================
# SÉCURITÉ SUPPLÉMENTAIRE (Django Security Middleware)
# ============================================

# Force HTTPS en production
SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=False, cast=bool)

# HSTS (HTTP Strict Transport Security) - Active en production avec HTTPS
SECURE_HSTS_SECONDS = config('SECURE_HSTS_SECONDS', default=0, cast=int)
SECURE_HSTS_INCLUDE_SUBDOMAINS = config('SECURE_HSTS_INCLUDE_SUBDOMAINS', default=False, cast=bool)
SECURE_HSTS_PRELOAD = config('SECURE_HSTS_PRELOAD', default=False, cast=bool)

# Empêche le navigateur de détecter le content-type
SECURE_CONTENT_TYPE_NOSNIFF = True

# Protection XSS dans les navigateurs anciens
SECURE_BROWSER_XSS_FILTER = True

# Clickjacking protection
X_FRAME_OPTIONS = 'DENY'
