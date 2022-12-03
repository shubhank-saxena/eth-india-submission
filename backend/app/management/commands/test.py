from app.helpers.send_email import send_email
from django.conf import settings
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Run by system crontab to send low balance alerts'

    def handle(self, *args, **kwargs):
        mail_list = ["tech@wall.app"]
        if settings.ENVI == 'TEST':
            email_sub = "{TEST} " + email_sub
        send_email("Test Mail", "Testing !", mail_list)
