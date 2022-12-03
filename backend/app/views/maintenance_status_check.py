from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.app.controllers.maintenance_status_check import MaintenanceStatusController


class MaintenanceCheck(APIView):

    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        controller = MaintenanceStatusController(request.data, request.user, *args, **kwargs)
        result = controller.get_maintenance_status()
        if result['success'] is True:
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
