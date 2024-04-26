from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Application
from .serializers import ApplicationSerializer


def get_applications_handler(request):
    applications = Application.objects.filter(user=request.user)
    serializer = ApplicationSerializer(applications, many=True)
    return Response({"data": serializer.data}, status=status.HTTP_200_OK)


def create_applications_handler(request):
    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(
            {"data": serializer.data}, status=status.HTTP_201_CREATED
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


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def application_handler(request):
    if request.method == "GET":
        return get_applications_handler(request)
    elif request.method == "POST":
        return create_applications_handler(request)
