from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.forms import ModelForm

from apps.models import Kundalik


class RegisterModelForm(ModelForm):
    class Meta:
        model = Kundalik
        fields = ['login', 'password']