from django.urls import path

from .views import get_applications_handler, status_confirmed, status_rejected

urlpatterns = [
    path("applications", get_applications_handler),
    path("application/accept/<int:pk>", status_confirmed),
    path("application/cancel/<int:pk>", status_rejected),
]
