from tracemalloc import Snapshot

import requests


class GetSnapshotProposalsController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_snapshot_proposals(self):
        result = {"message": "Data fetched successfully", "success": True}

        if 'snapshot_id' not in self.data.keys():
            result['message'] = "Snapshot Space id is mandatory!"
            result['success'] = False
            return result

        url = f"https://hub.snapshot.org/graphql?operationName=Proposals&query=query%20Proposals%20%7B%0A%20%20proposals%20(%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20space_in%3A%20%5B%22{self.data['snapshot_id']}%22%5D%2C%0A%20%20%20%20%20%20state%3A%20%22closed%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20orderBy%3A%20%22created%22%2C%0A%20%20%20%20orderDirection%3A%20desc%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%7D%0A%7D"
        data = requests.get(url=url).json()['data']['proposals']

        result['data'] = data
        return result
