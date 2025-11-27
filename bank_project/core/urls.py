from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('transfer/', views.transfer_view, name='transfer'),
    path('logout/', views.logout_view, name='logout'),
]
