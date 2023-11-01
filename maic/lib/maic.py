class MAIC:
    def __init__(self, model, trainer) -> None:
        self.model = model
        self.trainer = trainer
    
    def split_into_cores(self, size):
        pass

    def add_instance(self, demanded, core=None):
        inputs = demanded["inputs"]
        expected = demanded["expected"]
        self.trainer.Train(self, self.model, inputs, expected)
    
    def parallelize(self):
        pass

    def receive_signal(self, who, what):
        # search into its instances for "who"
        # everytime receives a signal, sends it to the api endpoint
        pass