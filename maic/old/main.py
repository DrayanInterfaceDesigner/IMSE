import requests

class Trainer:
    def __init__(self):
        self.endpoint = "http://localhost:5500/"
        self.id = 1
        self.counter = 0
        self.attemps = [f"{self.id}#190"]
        self.idealConfiguration = self.askIdealConfiguration()

    def train(self):
        self.sendSelf()

    def askIdealConfiguration(self):            
        response = requests.get(f"{self.endpoint}api/{self.id}/idealConfig")
        response_json = response.json()
        return response_json

    def sendSelf(self):
        requests.post(f"{self.endpoint}sendSelf", json={
            "id": self.id,
            "attemptConfiguration": {
                "x": self.attemps[0],
            },
            "counter": self.counter
        })

t = Trainer()
t.train()