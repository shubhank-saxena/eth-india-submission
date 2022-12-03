from django.urls import path

from . import views

urlpatterns = [
    path('maintenance-check', views.MaintenanceCheck.as_view()),
]
