from django.conf import settings
from sqlalchemy import create_engine, text

engine = create_engine(settings.CHAIN_DB)


def erc20TokenFilters(filterData):

    if filterData['parentFilter']['value'] == 'owns':
        if filterData['childFilter']['value'] == 'greater_than':
            comparision_operator = '>'
        elif filterData['childFilter']['value'] == 'less_than':
            comparision_operator = '<'
        else:
            raise Exception("Wrong operator")

        quantity = int(filterData['parameter'])

        query = f"""
        select wallet from erc20_balances
        where erc20='{filterData['token']['value']}' and amt {comparision_operator} {quantity}
        """

    return query
