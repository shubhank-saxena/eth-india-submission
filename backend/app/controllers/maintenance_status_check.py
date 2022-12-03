from datetime import datetime

from backend.app.models.maintenance_log import MaintenanceLog


class MaintenanceStatusController(object):
    def __init__(self, data, user_in_context, *args, **kwargs):
        self.data = data
        self.user_in_context = user_in_context

    def get_maintenance_status(self):
        result = {"message": "Data fetched successfully", "success": True, "site_available": True}
        current_time = datetime.now()
        if MaintenanceLog.objects.filter(from_time__lte=current_time, to_time__gte=current_time).exists():
            result['site_available'] = False
            maint_log = MaintenanceLog.objects.filter(from_time__lte=current_time, to_time__gte=current_time).first()
            result['next_available'] = str(maint_log.to_time)
        else:
            result['no_entry_found'] = True
        return result
