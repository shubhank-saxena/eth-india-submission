import json

from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder

from backend.persona.models.persona import PersonaData


class GetAllPersonaController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_all_persona(self):
        result = {"message": "Data fetched successfully", "success": True}

        data = []

        persona_object = PersonaData.objects.order_by("created_at").values()

        for persona in persona_object:
            persona['creator_address'] = User.objects.get(id=persona['user_id']).username
            data.append(persona)

        result['data'] = data

        return result
