from django.urls import path
from django.views.generic import TemplateView
from . import views
from .views import delete_account

urlpatterns = [
    # Routes existantes
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('logout/', views.logout_view, name='logout'),

    # Pages légales (RGPD)
    path('mentions-legales/', TemplateView.as_view(template_name="legal/mentions_legales.html"), name='mentions_legales'),
    path('politique-confidentialite/', TemplateView.as_view(template_name="legal/politique_confidentialite.html"), name='politique_confidentialite'),
    path('conditions-generales/', TemplateView.as_view(template_name="legal/conditions_generales.html"), name='conditions_generales'),

    # Suppression de compte (RGPD)
    path('supprimer-compte/', delete_account, name='delete_account'),
]
