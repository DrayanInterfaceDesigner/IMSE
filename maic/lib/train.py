from lib.maic import MAIC
from lib.connection import fetch
from lib.model import Model
from lib.mount import Mount
import random

class Train:
    def __init__(self, maic: MAIC, model, info) -> None:
        self.model = model()
        self.maic = maic
        self.ideal = info["expected"]
        self.input = info["input"]
        self.id = info["id"]
    
    def train(self):
        # output = f"Results from model number {self.id}"
        req = {
                'method': 'POST',
                'body': {'id': self.id, 'errorRate': 44.4, 'finished': False},
                'headers': {'Content-Type': 'application/json'}
            }
        
        for x in range(200+1):
            print(f"Iteration [ {iter} ] for instance id: {self.id}")

            if x < 200:
                req['body']['errorRate'] = random.uniform(0, 100)
                req['body']['status'] = "running"
            else:
                req['body']['status'] = "finished"
                req['body']['errorRate'] = 99.9
                self.emmit_alert_finished(None)

            fetch("http://localhost:5500/api/results", req)

    def emmit_alert_finished(self, what):
        self.maic.receive_signal(self, what)
