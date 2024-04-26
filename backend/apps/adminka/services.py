from rest_framework import status
from rest_framework.response import Response

from apps.application.models import Application


def get_application(pk):
    try:
        return Application.objects.get(pk=pk)
    except Application.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
