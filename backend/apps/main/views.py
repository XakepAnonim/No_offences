from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import LogSerializer, RegisterSerializer


@api_view(["POST"])
def logout(request):
    request.user.auth_token.delete()
    return Response({"message": "Log out"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def login(request):
    serializer = LogSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = User.objects.get(
                username=serializer.validated_data.get("username")
            )
        except:
            return Response(
                {
                    "error": {
                        "message": "User with this email or "
                        "password does not exist"
                    }
                }
            )
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"data": {"user_token": token.key}}, status=status.HTTP_200_OK
        )
    return Response(
        {
            "error": {
                "code": status.HTTP_422_UNPROCESSABLE_ENTITY,
                "message": "Validation error",
                "errors": serializer.errors,
            }
        },
        status=status.HTTP_422_UNPROCESSABLE_ENTITY,
    )


@api_view(["POST"])
def registration(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response(
            {
                "data": {
                    "user_token": token.key,
                }
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(
        {
            "error": {
                "code": status.HTTP_422_UNPROCESSABLE_ENTITY,
                "message": "Validation error",
                "errors": serializer.errors,
            }
        },
        status=status.HTTP_422_UNPROCESSABLE_ENTITY,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request):
    is_superuser = request.user.is_superuser
    return Response({"is_superuser": is_superuser})
