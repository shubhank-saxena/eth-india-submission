from django.db import models


class SnapshotSpaces(models.Model):
    snapshot_id = models.TextField()
    name = models.TextField()
    description = models.TextField()
    network = models.IntegerField()
    symbol = models.TextField()
    image_link = models.TextField()

    class Meta:
        managed = False
        db_table = 'snapshot_spaces'
