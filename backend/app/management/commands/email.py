from app.helpers.notification import send_user_notification
from app.helpers.send_email import send_email
from django.conf import settings
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Run by system crontab to send low balance alerts'

    def handle(self, *args, **kwargs):
        mail_list = ["noreply@wall.app"]
        send_email("Test mail", "Testing", mail_list)
