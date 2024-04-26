from rest_framework import serializers

from .models import Application, ApplicationStatus


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "number_car", "description", "status"]


class ApplicationStatusSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(
        choices=(
            (ApplicationStatus.CONFIRMED, "Подтвержено"),
            (ApplicationStatus.REJECTED, "Отклонено"),
        )
    )

    class Meta:
        model = Application
        fields = ["status"]

    def validate_status(self, value):
        if value not in [
            ApplicationStatus.CONFIRMED,
            ApplicationStatus.REJECTED,
        ]:
            raise serializers.ValidationError(
                "Статус заявки может быть изменен только на"
                " 'Подтвержено' или 'Отклонено'"
            )
        return value
