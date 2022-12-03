from django.forms.models import model_to_dict

from backend.persona.models.persona import PersonaData


class SavePersonaController(object):
    def __init__(self, data, user_in_context, *args, **kwargs):
        self.data = data
        self.user_in_context = user_in_context

    def save_persona(self):
        result = {"message": "Data saved successful", "success": True}
        user = self.user_in_context

        if 'persona_object' not in self.data.keys():
            result['message'] = "JSON Object is required!"
            result['success'] = False

        if 'persona_id' in self.data.keys():
            persona_object = PersonaData.objects.get(id=int(self.data['persona_id']))
            persona_object.persona_data = self.data['persona_object']
            persona_object.save()

        else:
            persona_object = PersonaData(user_id=user.id, persona_data=self.data['persona_object'])
            persona_object.save()

        result['data'] = {"persona_id": persona_object.id, "user_id": persona_object.user_id, "persona_data": persona_object.persona_data}

        return result
