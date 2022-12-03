import requests
from django.conf import settings
from sqlalchemy import create_engine, text

engine = create_engine(settings.CHAIN_DB)


def snapshotFilters(filterData):

    url = f"https://hub.snapshot.org/graphql?operationName=Votes&query=query%20Votes%20%7B%0A%20%20votes%20(%0A%20%20%20%20skip%3A%200%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20proposal%3A%20%22{filterData['proposal']['value']}%22%0A%20%20%20%20%7D%0A%20%20%20%20orderBy%3A%20%22created%22%2C%0A%20%20%20%20orderDirection%3A%20desc%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20voter%0A%20%20%20%20choice%0A%20%20%7D%0A%7D%0A"

    voters_data = []

    data = requests.get(url=url).json()['data']['votes']

    if int(filterData['choice']['value']) == 0:
        for votes in data:
            voters_data.append(votes['voter'].lower())
    else:
        for votes in data:
            if int(filterData['choice']['value']) == votes['choice']:
                voters_data.append(votes['voter'].lower())

    return voters_data
