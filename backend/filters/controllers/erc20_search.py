from backend.dune_helpers.helpers import get_query_results

class ERC20SearchController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def search_token(self):
        result = {"message": "Data fetched successfully", "success": True}

        if 'search_term' not in self.data.keys():
            result['message'] = "Search term is required!"
            result['success'] = False

        if self.data['search_term'].startswith(('0x')):
            search_returns = ERC20TokensEth.objects.filter(contract_address__contains=self.data['search_term'].lower()).using('wall_chain_db').values()
            result['data'] = search_returns

        else:
            search_returns = ERC20TokensEth.objects.filter(Q(name__istartswith=self.data['search_term']) | Q(symbol__istartswith=self.data['search_term'])).using('wall_chain_db')[0:10].values()

        result['data'] = search_returns
        return result
