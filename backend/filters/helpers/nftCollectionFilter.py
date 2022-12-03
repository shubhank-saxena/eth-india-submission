from django.conf import settings
from sqlalchemy import create_engine, text

engine = create_engine(settings.CHAIN_DB)


def nftCollectionFilters(filterData):

    if filterData['parentFilter']['value'] == 'no_of_nfts':
        if filterData['childFilter']['value'] == 'greater_than':
            comparision_operator = '>'
        elif filterData['childFilter']['value'] == 'less_than':
            comparision_operator = '<'
        else:
            raise Exception("Wrong operator")

        quantity = int(filterData['parameter'])

        query = f"""
        select receiver
        from
        (select collection_address, receiver, count(*) as cnt
        from present_holders_ethereum
        group by collection_address, receiver) as a
        where collection_address='{filterData['collection']['value']}' and cnt {comparision_operator} {quantity}
        """

    return query
