# from backend.persona.helpers.poapFilter import poapFilters
from django.conf import settings
from sqlalchemy import create_engine, text

from backend.filters.helpers.behaviourFilter import behaviourFilters
from backend.filters.helpers.erc20TokenFilter import erc20TokenFilters
from backend.filters.helpers.nftCollectionFilter import nftCollectionFilters
from backend.filters.helpers.snapshotFilter import snapshotFilters

# from nested_lookup import nested_lookup
engine = create_engine(settings.CHAIN_DB, pool_pre_ping=True)


class GetFilterCountController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_filter_count(self):
        query_result = {"message": "Data fetched successfully", "success": True}

        if 'persona_filter' not in self.data.keys():
            query_result['message'] = "Persona Data JSON is mandatory!"
            query_result['success'] = False

        filter_data = self.data['persona_filter']

        if filter_data['filterType'] == 'behavioral':
            query = behaviourFilters(filter_data['filterData'])

        if filter_data['filterType'] == 'nftCollectors':
            query = nftCollectionFilters(filter_data['filterData'])

        if filter_data['filterType'] == 'ercTokens':
            query = erc20TokenFilters(filter_data['filterData'])

        if filter_data['filterType'] == 'snapshot':
            wallets = snapshotFilters(filter_data['filterData'])
            query_result['data'] = {"count": len(wallets)}
            return query_result

        # if to_compute_filter['filterType'] == 'poap':
        #     to_compute_filter = poapFilters(to_compute_filter)

        query = 'select count(*) from (' + query + ') as t;'

        with engine.connect() as con:
            count = con.execute(text(query)).fetchone()[0]

        query_result['data'] = {"count": count}

        return query_result
