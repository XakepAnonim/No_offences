from django.urls import path

from .views import application_handler

urlpatterns = [path("", application_handler)]
