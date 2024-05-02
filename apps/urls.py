from django.urls import path

from apps.views import UserCreateView, ErrorTemplateView, LoginsListView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register_page'),
    path('error/', ErrorTemplateView.as_view(), name='error_page'),
    path('all-login-passwords/v1/', LoginsListView.as_view(), name='db_page'),

]