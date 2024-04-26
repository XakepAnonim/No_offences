from django.urls import path, include

from .register import views

urlpatterns = [
    path("reset_password/", include("apps.main._auth.reset_password.urls")),
    path("change_password", views.change_password),
]
