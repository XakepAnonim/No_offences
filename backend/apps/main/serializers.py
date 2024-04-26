from django.contrib.auth.password_validation import (
    validate_password as django_validate_password,
)
from rest_framework import serializers

from apps.main._auth.register.validators import NotEmailValidator
from apps.main.models import User


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        max_length=255, validators=[NotEmailValidator()]
    )
    email = serializers.EmailField(max_length=255)
    fullname = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=17)
    password = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "fullname", "phone", "password")

    def validate_username(self, value):
        if self.Meta.model.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Пользователь с таким логином уже существует"
            )
        return value

    def save(self, **kwargs):
        """
        Метод для сохранения нового пользователя.
        """
        user = User()
        user.email = self.validated_data["email"]
        user.username = self.validated_data["username"]
        user.fullname = self.validated_data["fullname"]
        user.phone = self.validated_data["phone"]
        user.set_password(self.validated_data["password"])
        user.save()
        return user


class LogSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=255)
    new_password = serializers.CharField(max_length=255)

    def validate_old_password(self, value):
        if not self.context["request"].user.check_password(value):
            raise serializers.ValidationError("Неверный пароль")
        return value

    def validate_new_password(self, value):
        django_validate_password(value)
        return value

    def validate(self, attrs):
        if attrs["old_password"] == attrs["new_password"]:
            raise serializers.ValidationError(
                "Новый пароль не должен совпадать со старым"
            )
        return attrs

    def create(self, validated_data):
        user = self.context["request"].user
        user.set_password(validated_data["new_password"])
        user.save()
        return user
