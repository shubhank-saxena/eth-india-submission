from django.conf import settings
from sqlalchemy import create_engine, text

from backend.filters.helpers.behaviourFilter import behaviourFilters
from backend.filters.helpers.erc20TokenFilter import erc20TokenFilters
from backend.filters.helpers.nftCollectionFilter import nftCollectionFilters
from backend.filters.helpers.snapshotFilter import snapshotFilters

# from backend.persona.helpers.poapFilter import poapFilters
# from nested_lookup import nested_lookup
engine = create_engine(settings.CHAIN_DB, pool_pre_ping=True)


def intersperse(word, your_list):
    x = [j for i in your_list for j in [i, word]]
    x.pop()
    return x


class GetBlockCountController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_block_count(self):
        query_result = {"message": "Data fetched successfully", "success": True}

        if 'block_object' not in self.data.keys():
            query_result['message'] = "Block Data JSON is mandatory!"
            query_result['success'] = False

        block_data = self.data['block_object']['data']

        operator_list = []

        block_type = block_data['blockType']
        filters_parsing = block_data['filters']
        filters_to_parse = list(block_data['filters'].keys())

        if len(filters_to_parse) > 0:
            for filter in filters_to_parse:

                if filters_parsing[filter]['filterType'] == 'behavioral':
                    query = behaviourFilters(filters_parsing[filter]['filterData'])

                if filters_parsing[filter]['filterType'] == 'nftCollectors':
                    query = nftCollectionFilters(filters_parsing[filter]['filterData'])

                if filters_parsing[filter]['filterType'] == 'ercTokens':
                    query = erc20TokenFilters(filters_parsing[filter]['filterData'])

                if filters_parsing[filter]['filterType'] == 'snapshot':
                    query = snapshotFilters(filters_parsing[filter]['filterData'])
                    temp_str = ""
                    for wallets in query:
                        temp_str = temp_str + "'" + wallets + "',"
                    temp_str = temp_str[:-1]
                    query = "select * from unnest(array[" + temp_str + "]) as wallet"

                # select * from unnest(array['0x8bbc693d042cea740e4ff01d7e0efb36110c36bf','0xa26fc7111446288be63ea7a146be79d99ae6c71f']) as wallet;

                # if to_compute_filter['filterType'] == 'poap':
                #     to_compute_filter = poapFilters(to_compute_filter)

                operator_list.append(query)

            if block_type == "and":
                final_query = intersperse('INTERSECT', operator_list)
            else:
                final_query = intersperse('union', operator_list)

            final_query = ' '.join(final_query)
            final_query = 'select count(*) from (' + final_query + ' ) as t'
            with engine.connect() as con:
                count = con.execute(text(final_query)).fetchone()[0]

        query_result['data'] = {"count": count}

        return query_result
