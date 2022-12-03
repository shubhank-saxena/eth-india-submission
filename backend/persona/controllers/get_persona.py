from django.contrib.auth.models import User

from backend.persona.models.persona import PersonaData


class GetPersonaController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_persona(self):
        result = {"message": "Data fetched successfully", "success": True}

        if 'persona_id' not in self.data.keys():
            result['message'] = "Persona ID is required!"
            result['success'] = False

        persona_object = PersonaData.objects.get(id=self.data['persona_id']).values()
        persona_object['creator_address'] = User.objects.get(id=persona_object.user_id).username
        result['data'] = persona_object

        return result
