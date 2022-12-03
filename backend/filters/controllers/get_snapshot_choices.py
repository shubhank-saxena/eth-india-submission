import requests


class GetSnapshotChoicesController(object):
    def __init__(self, data, *args, **kwargs):
        self.data = data

    def get_snapshot_choices(self):
        result = {"message": "Data fetched successfully", "success": True}

        if 'proposal_id' not in self.data.keys():
            result['message'] = "Snapshot Space id is mandatory!"
            result['success'] = False
            return result

        url = f"https://hub.snapshot.org/graphql?operationName=Proposals&query=query%20Proposals%20%7B%0A%20%20proposals%20(%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20id%3A%22{self.data['proposal_id']}%22%0A%20%20%20%20%7D%2C%0A%20%20)%20%7B%0A%20%20%20%20choices%0A%20%20%7D%0A%7D"
        data = requests.get(url=url).json()['data']['proposals'][0]['choices']

        choices_data = {}
        choices_data[0] = "All"
        for index, item in enumerate(data):
            choices_data[index + 1] = item

        result['data'] = choices_data
        return result
