import requests
from django.conf import settings

REVISE_BASE_URL = "https://api.revise.network/"

def fetchCollection(collectionID):

    url = REVISE_BASE_URL + "collections/" + collectionID
    headers = {"X-API-KEY": settings.REVISE_API_KEY}
    try:
        response_json = requests.get(url=url, headers=headers).json()
    except requests.exceptions.HTTPError as e:
        False, str(e), None
    except requests.exceptions.Timeout as e:
        False, str(e), None
    return True, "", response_json


def fetchCollections():

    url = REVISE_BASE_URL + "collections/"
    headers = {"X-API-KEY": settings.REVISE_API_KEY}
    try:
        response_json = requests.get(url=url, headers=headers).json()
    except requests.exceptions.HTTPError as e:
        False, str(e), None
    except requests.exceptions.Timeout as e:
        False, str(e), None
    return True, "", response_json

def addCollection():
    url = REVISE_BASE_URL + "collections/"
    headers = {"X-API-KEY": settings.REVISE_API}
    try:
        response_json = requests.post(url=url, headers=headers).json()
    except requests.exceptions.HTTPError as e:
        False, str(e), None
    except requests.exceptions.Timeout as e:
        False, str(e), None
    return True, "", response_json

def addNFT(collectionID):
    if collectionID:
        url = REVISE_BASE_URL + "collections/" + collectionID + "/nfts/"
        headers = {"X-API-KEY": settings.REVISE_API}
        try:
            response_json = requests.post(url = url, headers=headers).json()
        except requests.exceptions.HTTPError as e:
            False, str(e), None
        except requests.exceptions.Timeout as e:
            False, str(e), None
        return True, "", response_json    
    else:
        url = REVISE_BASE_URL + "nfts/addnft"
        headers = {"X-API-KEY": settings.REVISE_API}
        try:
            response_json = requests.post(url = url, headers=headers).json()
        except requests.exceptions.HTTPError as e:
            False, str(e), None
        except requests.exceptions.Timeout as e:
            False, str(e), None
        return True, "", response_json    

def updateNFT(nftID):
    url = REVISE_BASE_URL + "nfts/"+ nftID
    headers = {"X-API-KEY" : settings.REVISE_API_KEY}
    try:
        response_json = requests.put(url=url, headers=headers).json()
    except requests.exceptions.HTTPError as e:
        False, str(e), None
    except requests.exceptions.Timeout as e:
        False, str(e), None
    return True, "", response_json

# def fetchCollectionNFTsAPI(collectionID):
#     url = REVISE_BASE_URL + "collections/"+ collectionID + "/nfts"
#     headers = {"X-API-KEY" : settings.REVISE_API_KEY}
#     try:
#         response_json = requests.put(url=url, headers=headers).json()
#     except requests.exceptions.HTTPError as e:
#         False, str(e), None
#     except requests.exceptions.Timeout as e:
#         False, str(e), None
#     return True, "", response_json

def fetchNFT(nftID):
    url = REVISE_BASE_URL + "nfts/"+ nftID
    headers = {"X-API-KEY" : settings.REVISE_API_KEY}
    response_json = requests.put(url=url, headers=headers).json()

    metadata = response_json["metaData"]
    if not metadata:
        response_json["metaData"] = {}
    return True, "", response_json




