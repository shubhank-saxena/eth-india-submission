from django.conf import settings
from sqlalchemy import create_engine, text

from backend.filters.helpers.behaviourFilter import behaviourFilters
from backend.filters.helpers.erc20TokenFilter import erc20TokenFilters
from backend.filters.helpers.nftCollectionFilter import nftCollectionFilters
from backend.filters.helpers.snapshotFilter import snapshotFilters
from backend.persona.helpers.personaData import getPersonaData

# from backend.persona.helpers.poapFilter import poapFilters
# from nested_lookup import nested_lookup

engine = create_engine(settings.CHAIN_DB, pool_pre_ping=True)


def intersperse(word, your_list):
    x = [j for i in your_list for j in [i, word]]
    x.pop()
    return x


class SwitchController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_switch_data(self):
        query_result = {"message": "Data fetched successfully", "success": True}

        if 'persona_object' not in self.data.keys():
            query_result['message'] = "Persona Data JSON is mandatory!"
            query_result['success'] = False

        persona_data = self.data['persona_object']
        filters_to_parse = persona_data['blocks']
        filter_blocks = list(filters_to_parse.keys())
        persona_result = []

        for filter in filter_blocks:
            filter_to_parse = filters_to_parse[filter]
            if filter_to_parse['type'] == 'filter':
                sub_filters = list(filter_to_parse['data']['filters'].keys())
                operator_list = []
                for sub_fil in sub_filters:
                    to_compute_filter = filter_to_parse['data']['filters'][sub_fil]

                    if to_compute_filter['filterType'] == 'behavioral':
                        query = behaviourFilters(to_compute_filter['filterData'])

                    if to_compute_filter['filterType'] == 'nftCollectors':
                        query = nftCollectionFilters(to_compute_filter['filterData'])

                    if to_compute_filter['filterType'] == 'ercTokens':
                        query = erc20TokenFilters(to_compute_filter['filterData'])

                    if to_compute_filter['filterType'] == 'snapshot':
                        query = snapshotFilters(to_compute_filter['filterData'])
                        temp_str = ""
                        for wallets in query:
                            temp_str = temp_str + "'" + wallets + "',"
                        temp_str = temp_str[:-1]
                        query = "select * from unnest(array[" + temp_str + "]) as wallet"

                    # if to_compute_filter['filterType'] == 'poap':
                    #     to_compute_filter = poapFilters(to_compute_filter)

                    operator_list.append(query)
                if filter_to_parse['data']['blockType'] == "and":
                    common_wallets = intersperse('INTERSECT', operator_list)
                    common_wallets = ' '.join(common_wallets)

                    # common_wallets = list(set().intersection(*operator_list))
                else:
                    common_wallets = intersperse('union', operator_list)
                    common_wallets = ' '.join(common_wallets)
                    # common_wallets = list(set().union(*operator_list))

                persona_result.append(common_wallets)

            else:
                if filter_to_parse['data']['relationType'] == 'and':
                    persona_result.append('intersect')
                else:
                    persona_result.append('union')

        persona_result = ' '.join(persona_result)

        if persona_data['isCount']:
            persona_result = 'select count(*) from (' + persona_result + ') as t'
            with engine.connect() as con:
                persona_result = con.execute(text(persona_result)).fetchone()[0]
            query_result['data'] = {"count": persona_result}

        else:
            persona_result = getPersonaData(persona_result)
            persona_result = sum(persona_result, [])
            query_result['data'] = persona_result

        return query_result
