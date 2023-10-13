import torch
import torch.nn as nn

class Model(nn.Module):
    def __init__(self, num_input, num_output, num_hidden_layers=32, hidden_layer_size=128):
        super(Model, self).__init__()

        self.num_input = num_input
        self.num_output = num_output
        self.num_hidden_layers = num_hidden_layers
        self.hidden_layer_size = hidden_layer_size

        # Create input and output layers
        self.input_layer = nn.Linear(num_input, hidden_layer_size)
        self.output_layer = nn.Linear(hidden_layer_size, num_output)

        # Create hidden layers
        self.hidden_layers = nn.ModuleList()
        for _ in range(num_hidden_layers - 1):
            self.hidden_layers.append(nn.Linear(hidden_layer_size, hidden_layer_size))

    def forward(self, x):
        x = torch.tanh(self.input_layer(x))

        # Pass through hidden layers
        for layer in self.hidden_layers:
            x = torch.tanh(layer(x))

        x = self.output_layer(x)
        return x
    