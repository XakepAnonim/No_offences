from django.apps import AppConfig


class ApplicationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.application"
    verbose_name = "Заявления"