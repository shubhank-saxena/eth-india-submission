from django.db import models

from backend.app.models.base import BaseMetaModel


class MaintenanceLog(BaseMetaModel):
    from_time = models.DateTimeField()
    to_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'maintenance_log'
