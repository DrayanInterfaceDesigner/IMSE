import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import matplotlib.pyplot as plt



def maximize(outputs):
    total = outputs.sum()
    return (25 <= total <= 60)


class SimpleNet(nn.Module):
    def __init__(self, num_input, num_output, num_hidden_layers=1, hidden_layer_size=4):
        super(SimpleNet, self).__init__()

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
        x = torch.relu(self.input_layer(x))

        # Pass through hidden layers
        for layer in self.hidden_layers:
            x = torch.relu(layer(x))

        x = self.output_layer(x)
        return x

class ComplexNet(nn.Module):
    def __init__(self, num_input, num_output, num_hidden_layers=3, hidden_layer_size=16):
        super(ComplexNet, self).__init__()

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

# Create the neural network
net = ComplexNet(num_input=8, num_output=8)

# Define the optimizer and loss function
optimizer = optim.SGD(net.parameters(), lr=0.01)
criterion = nn.MSELoss()  # Mean Squared Error loss for regression

opt = 0
inits = []
attps = []

def append_as_arr(tensor, arr):
    arr.append(tensor.detach().cpu().numpy())
# Training loop

max_attempts = 20000  # Maximum number of training attempts
for attempt in range(max_attempts):
    # inputs = torch.rand(8) * 360 # Generate random input data
    inputs = torch.rand(8)
    append_as_arr(inputs, inits)


    optimizer.zero_grad()
    outputs = net(inputs)
    opt = outputs

    print("IN: ", inputs)
    for x in opt.detach().cpu().numpy():
        print(x, end="| ")
    print("\n")

    # Define the expected outputs (supervisor's job)
    expected_outputs = torch.tensor([360, 212, 13, 34, 2, 111, -360, -25], dtype=torch.float32)
    
    # Compute the loss between the model's output and the expected outputs
    loss = criterion(outputs, expected_outputs)
    
    # Backpropagation and optimization
    loss.backward()
    optimizer.step()
    # append_as_arr(opt, attps)

    print("LOSS: ", loss.item() % 100)
    attps.append(loss.item() % 100)
    inputs = outputs.detach()
    # Check if the loss is below a certain threshold (you can set your threshold)
    if loss.item() < 0.2:
        break

print(f"Training completed in {attempt+1} attempts.")







# # Your list of error rates for each try
# error_rates = attps

# # Your list of initial values for each try
# initial_values = inits

# # Create a list of corresponding tries (e.g., 1, 2, 3, ...)
# tries = list(range(1, len(error_rates) + 1))

# # Create a line plot for error rates
# plt.plot(tries, error_rates, marker='o', color='blue', label='Error Rate')

# # Create a scatter plot for initial values
# plt.scatter(tries, [0] * len(tries), marker='x', color='red', label='Initial Values')

# # Add labels and title
# plt.xlabel('Tries')
# plt.ylabel('Error Rate (%) / Initial Values')
# plt.title('Error Rate and Initial Values vs. Tries')

# # Set the y-axis limit from 0 to 100 for error rates
# plt.ylim(0, 100)

# # Set the legend to distinguish error rates and initial values
# plt.legend()

# # Show the plot
# plt.grid(True)
# plt.show()



# Replace 'speeds' with your actual array of 100 speeds
# speeds = np.random.uniform(0, 10, 100)  # Example: Random speeds between 0 and 10 m/s

# # Create an array of time values from 0 to 100 seconds
# time = np.linspace(0, 100, 100)

# Create the velocity-time graph
plt.plot(list(range(len(attps))), attps)

# Add labels and title
plt.xlabel("Tries (iters)")
plt.ylabel('Error Rate (%)')
plt.title('Error Rate vs. Tries')

# Show the plot
plt.grid()
plt.show()