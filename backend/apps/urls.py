from django.urls import path, include

urlpatterns = [
    path("", include("apps.main.urls")),
    path("password/", include("apps.main._auth.urls")),
    path("application/", include("apps.application.urls")),
    path("admin/", include("apps.adminka.urls")),
]
