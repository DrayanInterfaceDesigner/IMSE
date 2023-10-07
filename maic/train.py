from maic import MAIC

class Train:
    def __init__(self, maic: MAIC, model, input, expected) -> None:
        self.model = model()
        self.input = input
        self.maic = maic
    
    def train(self):
        pass

    def emmit_alert_finished(self, what):
        self.maic.receive_signal(self, what)
        pass