from django.conf import settings
from sqlalchemy import create_engine, text

engine = create_engine(settings.CHAIN_DB)


def behaviourFilters(filterData):

    if filterData['parentFilter']['value'] == 'nfts_holding':
        if filterData['childFilter']['value'] == 'greater_than':
            comparision_operator = '>'
        elif filterData['childFilter']['value'] == 'less_than':
            comparision_operator = '<'
        else:
            raise Exception("Wrong operator")

        quantity = int(filterData['parameter'])

        query = f"""
        select wallet from wallet_profiling wp where current_nfts_held {comparision_operator} {quantity}
        """

    elif filterData['parentFilter']['value'] == 'nfts_holding_ever':
        if filterData['childFilter']['value'] == 'greater_than':
            comparision_operator = '>'
        elif filterData['childFilter']['value'] == 'less_than':
            comparision_operator = '<'
        else:
            raise Exception("Wrong operator")

        quantity = int(filterData['parameter'])

        query = f"""
        select wallet from wallet_profiling wp where nfts_ever_held {comparision_operator} {quantity}
        """

    else:
        query = ""

    return query
