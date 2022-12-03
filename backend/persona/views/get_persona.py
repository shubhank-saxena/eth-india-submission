from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.persona.controllers.get_persona import GetPersonaController


class GetPersonaView(APIView):
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
    def get(self, request, *args, **kwargs):
        controller = GetPersonaController(request.query_params, request.user, *args, **kwargs)
        result = controller.get_persona()
        if result['success'] is True:
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
