from django.urls import path

from . import views

urlpatterns = [
    path(
        "request/",
        views.request_password_reset_email,
        name="request_reset_email",
    ),
    path("_auth/", views.password_reset_email, name="password_reset_confirm"),
]
