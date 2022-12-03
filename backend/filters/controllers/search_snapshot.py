from backend.filters.models.snapshot_spaces import SnapshotSpaces


class SnapshotSearchController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def search_snapshot(self):
        result = {"message": "Data fetched successfully", "success": True}

        if 'search_term' not in self.data.keys():
            result['message'] = "Search term is required!"
            result['success'] = False

        search_returns = SnapshotSpaces.objects.filter(name__istartswith=self.data['search_term'].lower())[0:10].values()
        result['data'] = search_returns

        return result
