from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .services import get_application
from ..application.models import ApplicationStatus, Application
from ..application.serializers import (
    ApplicationStatusSerializer,
    ApplicationSerializer,
)
from ..permissions import IsAdmin


@api_view(["GET"])
@permission_classes([IsAdmin])
def get_applications_handler(request):
    applications = Application.objects.filter(status=ApplicationStatus.NEW)
    serializer = ApplicationSerializer(applications, many=True)
    return Response({"data": serializer.data}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAdmin])
def status_confirmed(request, pk):
    application = get_application(pk)
    if application.status != ApplicationStatus.NEW:
        return Response(
            {"error": "Нельзя изменить статус данного заявления"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    data = {"status": ApplicationStatus.CONFIRMED}
    serializer = ApplicationStatusSerializer(
        application, data=data, partial=True
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAdmin])
def status_rejected(request, pk):
    application = get_application(pk)
    if application.status != ApplicationStatus.NEW:
        return Response(
            {"error": "Нельзя изменить статус данного заявления"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    data = {"status": ApplicationStatus.REJECTED}
    serializer = ApplicationStatusSerializer(
        application, data=data, partial=True
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
