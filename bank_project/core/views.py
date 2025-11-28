from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import get_user_model
User = get_user_model()


def is_admin(user):
    return user.is_staff

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('dashboard')
    else:
        form = AuthenticationForm()
        form.fields['username'].widget.attrs.update({
            'placeholder': 'Nom d\'utilisateur',
            'class': 'form-input',
            'autocomplete': 'username'
        })
        form.fields['password'].widget.attrs.update({
            'placeholder': 'Mot de passe',
            'class': 'form-input',
            'autocomplete': 'current-password'
        })
    return render(request, 'auth/login.html', {'form': form})

@login_required
def home_view(request):
    username = request.user.username
    is_admin = request.user.is_staff
    return render(request, "home.html", {
        "username": username,
        "is_admin": is_admin,
    })

@login_required
def dashboard_view(request):
    if request.user.is_staff:
        return render(request, "dashboard_admin.html")
    else:
        return render(request, "dashboard_user.html")


@login_required
@user_passes_test(is_admin)
def admin_panel(request):
    users = User.objects.all()
    return render(request, "admin_panel.html", {"users": users})

@login_required
@user_passes_test(is_admin)
def create_user_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        is_staff = request.POST.get('is_staff') == 'on'
        
        user = User.objects.create_user(
            username=username,
            password=password,
            is_staff=is_staff  
        )
        return redirect('admin_panel')

    return render(request, "create_user.html")

def logout_view(request):
    logout(request)
    return redirect('login')
