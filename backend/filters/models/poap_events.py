from django.db import models


class POAPs(models.Model):
    fancy_id = models.TextField()
    name = models.TextField()
    event_url = models.TextField()
    image_url = models.TextField()
    description = models.TextField()
    year = models.TextField()
    start_date = models.TextField()
    poap_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'poap_events'
