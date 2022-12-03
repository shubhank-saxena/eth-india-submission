from django.urls import path

from . import views

urlpatterns = [
    path('persona/get/all', views.GetAllPersonaView.as_view()),
    path('persona/filters/data', views.SwitchView.as_view()),
    path('persona/filter/count', views.GetPersonaCountView.as_view()),
    path('persona/save', views.SavePersonaView.as_view()),
    path('persona/get', views.GetPersonaView.as_view()),
    # TODO - Implement Search on persona object
    # Refer - https://www.postgresql.org/docs/current/datatype-json.html
    # path('persona/search')
]
