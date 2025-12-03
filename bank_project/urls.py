"""
URL configuration for bank_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include
=======
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from core import views as core_views
>>>>>>> 9d7df2e3e8052ed07f44486b78d63f1096939998

urlpatterns = [
    # ============================================
    # ADMINISTRATION DJANGO
    # ============================================
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('', include('core.urls')),  
=======

    # ============================================
    # AUTHENTIFICATION
    # ============================================
    path('login/', core_views.login_view, name='login'),
    path('register/', core_views.register_view, name='register'),
    path('logout/', core_views.logout_view, name='logout'),

    # ============================================
    # PAGE D'ACCUEIL
    # ============================================
    path('', core_views.home_view, name='home'),  # Page d'accueil accessible à la racine du site
    path('home/', core_views.home_view, name='home_alt'),  # Alias pour /home/

    # ============================================
    # PAGES LÉGALES (RGPD)
    # ============================================
    path('legal/', core_views.legal_view, name='legal'),
    path('privacy/', core_views.privacy_view, name='privacy'),
>>>>>>> 9d7df2e3e8052ed07f44486b78d63f1096939998
]

# Servir les fichiers statiques en développement
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
