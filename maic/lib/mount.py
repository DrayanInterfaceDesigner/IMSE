import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import matplotlib.pyplot as plt
from lib.connection import fetch


class Mount:
    def __init__(self, student, model, max_epochs = 2000) -> None:
        self.id = student['id']
        self.expected = student['expected']
        self.net = model
        self.optimizer = optim.SGD(self.net.parameters(), lr=0.01)
        self.criterion = nn.MSELoss()
        self.output = []
        self.inits = []
        self.epochs = []
        self.max_epochs = max_epochs
        self.status = 'inactive'
        self.req = {
            'method': 'POST',
            'body': {'id': self.id, 'errorRate': 'null', 'status': self.status},
            'headers': {'Content-Type': 'application/json'}
        }

    def run(self):
        for epoch in range(self.max_epochs):
            # inputs = torch.rand(8) * 360 # Generate random input data
            inputs = torch.rand(8)
            append_as_arr(inputs, self.inits)


            self.optimizer.zero_grad()
            outputs = self.net(inputs)
            self.output = outputs

            print("IN: ", inputs)
            for x in self.output.detach().cpu().numpy():
                print(x, end="| ")
            print("\n")

            # Define the expected outputs (supervisor's job)
            expected_outputs = torch.tensor(self.expected, dtype=torch.float32)
            
            # Compute the loss between the model's output and the expected outputs
            loss = self.criterion(outputs, expected_outputs)
            
            # Backpropagation and optimization
            loss.backward()
            self.optimizer.step()

            print("LOSS: ", loss.item() % 100)
            self.epochs.append(loss.item() % 100)
            inputs = self.output.detach()
            
            if loss.item() > 0.01:
                self.status = 'running'
                self.send_status(loss.item())
            else:
                self.status = 'finished'
                self.send_status(loss.item())
                # self.send_status(self.output.detach().numpy().tolist())
                # self.send_status(self.output.detach())
                self.plot()
                break

        print(f"Training completed in {epoch+1} epochs.")

    def send_status(self, package):
        self.req['body']['status'] = self.status
        self.req['body']['errorRate'] = package
        self.req['body']['output'] = self.output.detach().numpy().tolist()
        fetch("http://localhost:5500/api/results", self.req)

    def plot(self):
        plt.plot(list(range(len(self.epochs))), self.epochs)

        plt.xlabel("Epochs")
        plt.ylabel('Error Rate (%)')
        plt.title('Error Rate vs. Tries')

        plt.grid()
        plt.show()


def append_as_arr(tensor, arr):
    arr.append(tensor.detach().cpu().numpy())