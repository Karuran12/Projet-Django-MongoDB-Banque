import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bank_project.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()


def create_admin():
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser(
            username="admin",
            email="admin@djanpay.com",
            password="admin123"
        )
        print("Admin créé avec succès !")
    else:
        print("Admin existe déjà.")

create_admin()
