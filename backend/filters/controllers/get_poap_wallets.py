import requests

# TODO - Shift ENVs to .env


def get_poap_wallets():
    url = "https://api.poap.tech/event/id/poaps"

    headers = {
        "accept": "application/json",
        "authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qQTNOalpGUWpkRE9ESTNRa0V3UlVSRE9VVkVNRVUxT1VVd1JrSTNNRGs1TlRORVFqUTNSUSJ9.eyJpc3MiOiJodHRwczovL3BvYXBhdXRoLmF1dGgwLmNvbS8iLCJzdWIiOiJhZzRucUNvVExFUmtjdmR0WXZ3dVhZSThTVEpWRnVOU0BjbGllbnRzIiwiYXVkIjoid2FsbC5hcHAiLCJpYXQiOjE2NjY5Mzc2OTYsImV4cCI6MTY2NzAyNDA5NiwiYXpwIjoiYWc0bnFDb1RMRVJrY3ZkdFl2d3VYWUk4U1RKVkZ1TlMiLCJzY29wZSI6Im1pbnQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6WyJtaW50Il19.dpShMqR6avCtLwBZEqN_lylhvUwa1JJzY59Zv8pxDBI0vuhUdAuJiWA7IqKLtAGrDEW2tOcLRJw8JVh_I51gj83mKTEt5oaaXn8IfvizAPHZtWr4iz3lk7OpEorofrIy_QGZgUVlHFDigjMSap3UM2CA0mZthb8jEnYKMg4cV1AV72quG--wScs9vkrq4ruy-FChw2_jdi-4NVtgGgWn6G0j9J1fik9Efozq2W7ffFKP1kEEGYyK1LObYq0LC5J_KldO6ywUfXK5aTZcEfyDa-Exbb-enztU822MLAI4Yexe1OsC3CiP2TSbigIU0FmO9Lo4WrmdX0PT6i877BxFEQ",
        "X-API-Key": "QVc94DhnwfmQ3LrHG1SYessGG1p2896iCS42vXkgNRbCkP17zTkRJHZCzI8p9iL15uvg5NYiw8Mhw1e6yZtekPoGJwhRKQAPWwNFFzxcI8J8ljUpAgFGGkbBzMVeTpnG",
    }

    response = requests.get(url, headers=headers)
    response = response.json()

    return response
