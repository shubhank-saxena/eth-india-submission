from django.conf import settings
from pyfcm import FCMNotification


def send_single_notification(api_key, message_title, message_body, registration_id):
    push_service = FCMNotification(api_key=api_key)
    return push_service.notify_single_device(
        registration_id=registration_id,
        message_title=message_title,
        message_body=message_body,
    )


def send_user_data_message_notification(data_message, extra_notification_kwargs, registration_id):
    push_service = FCMNotification(api_key=settings.CUSTOMER_APP_FCM_API_KEY)
    return push_service.single_device_data_message(registration_id=registration_id, data_message=data_message, extra_notification_kwargs=extra_notification_kwargs)


def send_user_notification(message_title, message_body, registration_id, data_message):
    try:
        push_service = FCMNotification(api_key=settings.CUSTOMER_APP_FCM_API_KEY)
        return push_service.notify_single_device(registration_id=registration_id, message_title=message_title, message_body=message_body, data_message=data_message, content_available=True)
    except:
        return None


def send_multiple_notifications(api_key, message_title, message_body, registration_ids):
    push_service = FCMNotification(api_key=api_key)
    return push_service.notify_multiple_devices(registration_ids=registration_ids, message_title=message_title, message_body=message_body)
