import csv

from django.http import HttpResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.persona.controllers.switch import SwitchController


class SwitchView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        tags=['UserProfile'],
        manual_parameters=[
            openapi.Parameter(name='wallet_address', type=openapi.TYPE_STRING, in_=openapi.IN_QUERY, description='wallet_address of the user', required=True),
        ],
        operation_summary='Display User profile',
        operation_description="""This endpoint returns the user performance state.
        \n Note - This endpoint is being used by twitter bot for Wall to post info about specific users""",
    )
    def post(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv', headers={'Content-Disposition': 'attachment; filename="wallets.csv"'}, status=status.HTTP_200_OK)

        controller = SwitchController(request.data, request.user, *args, **kwargs)
        result = controller.get_switch_data()

        if result['success'] is True:
            writer = csv.writer(response)
            writer.writerow(['Wallets'])
            for wallet in result['data']:
                writer.writerow([wallet])
            return response

        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
