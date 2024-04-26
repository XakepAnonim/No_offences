from django.core.validators import RegexValidator
from django.db import models

from apps.main.models import User


class ApplicationStatus(models.TextChoices):
    """
    Статус заявления
    NEW - новое заявление
    CONFIRMED - нарушение подтвержено
    REJECTED - нарушение отклонено
    """

    NEW = "Новое"
    CONFIRMED = "Подтвержено"
    REJECTED = "Отклонено"


class Application(models.Model):
    """
    Модель заявления
    """

    number_car = models.CharField(
        max_length=10,
        verbose_name="Номер автомобиля",
        validators=[
            RegexValidator(
                regex="^[A-ZА-Я]{1}\d{3}[A-ZА-Я]{2}\s\d{3}$",
                message='Номер автомобиля должен быть в формате "А000АА 000"',
                code="invalid_number_car",
            )
        ],
    )
    description = models.TextField(verbose_name="Описание нарушения")
    status = models.CharField(
        verbose_name="Статус заявления",
        max_length=12,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.NEW,
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="applications",
        verbose_name="ФИО подавшего",
    )

    def __str__(self):
        return (
            f"От кого: {self.user.username}, номер: {self.number_car}"
            f", нарушение: {self.description}"
        )

    class Meta:
        verbose_name = "Заявление"
        verbose_name_plural = "Заявления"
