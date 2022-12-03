from django.db import models

from backend.app.models.base import BaseModel


class PersonaData(BaseModel):
    user_id = models.IntegerField(blank=True, null=True)
    private = models.BooleanField(null=False, default=False)
    persona_data = models.JSONField()

    class Meta:
        managed = False
        db_table = 'persona_data_table'
