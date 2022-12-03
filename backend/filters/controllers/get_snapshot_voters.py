from tracemalloc import Snapshot

import requests


class GetSnapshotVotersController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_snapshot_voters(self):
        result = {"message": "Data fetched successfully", "success": True}

        if 'proposal_id' not in self.data.keys():
            result['message'] = "Snapshot Space id is mandatory!"
            result['success'] = False
            return result

        if 'vote_id' not in self.data.keys():
            result['message'] = "Vote id is mandatory!"
            result['success'] = False
            return result

        url = f"https://hub.snapshot.org/graphql?operationName=Votes&query=query%20Votes%20%7B%0A%20%20votes%20(%0A%20%20%20%20skip%3A%200%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20proposal%3A%20%22{self.data['proposal_id']}%22%0A%20%20%20%20%7D%0A%20%20%20%20orderBy%3A%20%22created%22%2C%0A%20%20%20%20orderDirection%3A%20desc%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20voter%0A%20%20%20%20choice%0A%20%20%7D%0A%7D%0A"

        voters_data = []

        data = requests.get(url=url).json()['data']['votes']
        if self.data['vote_id'] == 0:
            for votes in data:
                voters_data.append(votes['voter'].lower())
        else:
            for votes in data:
                if self.data['vote_id'] in votes['choice']:
                    voters_data.append(votes['voter'].lower())

        result['data'] = voters_data
        return result
