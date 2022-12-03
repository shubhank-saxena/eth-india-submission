from backend.filters.models.poap_events import POAPs


class POAPSearchController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def search_poap(self):
        result = {"message": "Data fetched successfully", "success": True}

        if 'search_term' not in self.data.keys():
            result['message'] = "Search term is required!"
            result['success'] = False

        search_returns = POAPs.objects.filter(name__icontains=self.data['search_term'])[0:10].values()
        result['data'] = search_returns

        return result
