from django.contrib import admin
from django.urls import path, re_path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Wall B2B API",
        default_version='v1',
        description="List of Backend APIs for Wall B2B",
    ),
    public=False,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('api/', include('backend.persona.urls')),
    re_path('api/', include('backend.filters.urls')),
]
