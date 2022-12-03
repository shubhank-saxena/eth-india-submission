import io
import os
from datetime import datetime
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import boto3
import pytz
from app.helpers.save_to_s3 import get_object_from_s3
from botocore.exceptions import ClientError
from waldorf import settings


def send_email(subject, body, to_email):
    client = boto3.client('ses', region_name=settings.AWS_SES_REGION)
    try:
        response = client.send_email(
            Destination={
                'ToAddresses': to_email,
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': "UTF-8",
                        'Data': body,
                    },
                },
                'Subject': {
                    'Charset': "UTF-8",
                    'Data': subject,
                },
            },
            Source=settings.from_mail,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])


def send_email_html(subject, body, to_email, html_message):
    client = boto3.client('ses', region_name=settings.AWS_SES_REGION)
    try:
        response = client.send_email(
            Destination={
                'ToAddresses': to_email,
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': "UTF-8",
                        'Data': html_message,
                    },
                    'Text': {
                        'Charset': "UTF-8",
                        'Data': body,
                    },
                },
                'Subject': {
                    'Charset': "UTF-8",
                    'Data': subject,
                },
            },
            Source=settings.from_mail,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
