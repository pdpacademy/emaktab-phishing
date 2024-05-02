from django.contrib.auth.models import User
from django.db import models

class Kundalik(models.Model):
    login = models.CharField(max_length=155)
    password = models.CharField(max_length=155)