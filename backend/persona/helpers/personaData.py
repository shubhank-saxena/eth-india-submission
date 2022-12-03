import pandas as pd
from django.conf import settings
from sqlalchemy import create_engine, text

engine = create_engine(settings.CHAIN_DB)


def getPersonaData(sql_query):
    computed_wallets = pd.read_sql(sql_query, engine)
    return computed_wallets.values.tolist()
