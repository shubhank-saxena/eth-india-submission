import requests
from django.conf import settings
import time

API_KEY = settings.DUNE_API_KEY
HEADER = {"x-dune-api-key" : API_KEY}

BASE_URL = "https://api.dune.com/api/v1/"


def make_api_url(module, action, ID):
    url = BASE_URL + module + "/" + ID + "/" + action
    return url

def execute_query(query_id):
    url = make_api_url("query", "execute", query_id)
    response = requests.post(url, headers=HEADER)
    execution_id = response.json()['execution_id']

    return execution_id

def get_query_status(execution_id):
    url = make_api_url("execution", "status", execution_id)
    response = requests.get(url, headers=HEADER)

    return response

def get_query_results(query_id):
    execution_id = execute_query(query_id)
    print(get_query_status(execution_id).json())
    # print(execution_status)

    url = make_api_url("execution", "results", execution_id)
    response = requests.get(url, headers=HEADER)

    time.sleep(5)

    return response['result']['rows']

# get_query_results(str(1698919))