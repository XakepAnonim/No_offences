from django.urls import path

from .views import (
    registration,
    login,
    logout,
    get_user,
)

urlpatterns = [
    path("register", registration),
    path("login", login),
    path("logout", logout),
    path("get_user", get_user),
]
