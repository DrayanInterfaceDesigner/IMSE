import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import time
import matplotlib.pyplot as plt
from lib.connection import fetch


class Mount:
    def __init__(self, student, model, max_epochs = 2000, graph=False, sleep=1) -> None:
        self.id = student['id']
        self.expected = student['train']['expected']
        self.net = model
        self.optimizer = optim.SGD(self.net.parameters(), lr=0.01)
        self.criterion = nn.MSELoss()
        # for god's sake move input to train, and call it "inputs"
        self.inputs = torch.tensor(student['train']['inputs'], dtype=torch.float32)
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
        self.graph = graph
        self.sleep = sleep

    def run(self):
        print(f"ID [ {self.id} ] | Training started.")
        for epoch in range(self.max_epochs):
            inputs = self.inputs
            append_as_arr(inputs, self.inits)


            self.optimizer.zero_grad()
            outputs = self.net(inputs)
            self.output = outputs

            # print("IN: ", inputs)
            # for x in self.output.detach().cpu().numpy():
            #     print(x, end="| ")
            # print("\n")

            # Define the expected outputs (supervisor's job)
            expected_outputs = torch.tensor(self.expected, dtype=torch.float32)
            
            # Compute the loss between the model's output and the expected outputs
            loss = self.criterion(outputs, expected_outputs)
            
            # Backpropagation and optimization
            loss.backward()
            self.optimizer.step()

            # print("LOSS: ", loss.item() % 100)
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
                break
            time.sleep(self.sleep)

        print(f"ID [ {self.id} ] | Finished Training with loss [ {loss.item()} ] | Completed in {epoch+1} epochs.\n")
        if(self.graph): self.plot()

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