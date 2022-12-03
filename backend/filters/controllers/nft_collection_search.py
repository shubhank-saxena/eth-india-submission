from backend.filters.models.nfts_eth import NFTsEth


class NFTCollectionSearchController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def search_collection(self):
        result = {"message": "Data fetched successfully", "success": True}

        if 'search_term' not in self.data.keys():
            result['message'] = "Search term is required!"
            result['success'] = False

        if self.data['search_term'].startswith(('0x')):
            search_returns = NFTsEth.objects.filter(contract_address__contains=self.data['search_term'].lower()).values()
            result['data'] = search_returns

        else:
            search_returns = NFTsEth.objects.filter(collection_name__istartswith=self.data['search_term'])[0:10].values()

        result['data'] = search_returns
        return result
