from django.contrib import admin

from apps.models import Kundalik


@admin.register(Kundalik)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ['login']
