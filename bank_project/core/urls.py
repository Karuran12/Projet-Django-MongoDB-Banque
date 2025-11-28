from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('home/', views.home_view, name='home'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    
    path('admin-panel/', views.admin_panel, name='admin_panel'),
    path('create-user/', views.create_user_view, name='create_user'),
]
