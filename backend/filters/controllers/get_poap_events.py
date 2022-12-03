from backend.filters.models.poap_events import POAPs


class GetPOAPsController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_poaps(self):
        result = {"message": "Data fetched successfully", "success": True}

        poaps = list(POAPs.objects.all().using('wall_chain_db').values())
        result['data'] = poaps
        return result
