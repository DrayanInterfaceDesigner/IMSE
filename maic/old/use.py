import torch
import torch.nn as nn
import torch.optim as optim

criterion = nn.MSELoss()
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

def train_model():
    # Create the neural network
    net = ComplexNet(num_input=8, num_output=8, num_hidden_layers=6, hidden_layer_size=4)

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
    save_interval = 1000  # Save the model and optimizer state every 1000 iterations
    for attempt in range(max_attempts):
        # Generate random input data
        inputs = torch.rand(8)
        append_as_arr(inputs, inits)

        optimizer.zero_grad()
        outputs = net(inputs)
        opt = outputs

        # Print the output for the current input
        print("IN: ", inputs)
        for x in opt.detach().cpu().numpy():
            print(x, end="| ")
        print("\n")

        # Define the expected outputs
        expected_outputs = torch.tensor([360, 212, 13, 34, 2, 111, -360, -25], dtype=torch.float32)

        # Compute the loss between the model's output and the expected outputs
        loss = criterion(outputs, expected_outputs)

        # Backpropagation and optimization
        loss.backward()
        optimizer.step()

        # Append the loss to the list of losses
        attps.append(loss.item() % 100)

        # Save the model and optimizer state every 1000 iterations
        if (attempt + 1) % save_interval == 0:
            torch.save({
                'model_state_dict': net.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'loss': loss,
                'iteration': attempt + 1
            }, 'checkpoint.pth')

        # Check if the loss is below a certain threshold
        if loss.item() < 0.2:
            break

    print(f"Training completed in {attempt+1} attempts.")

    # Save the final model and optimizer state
    torch.save({
        'model_state_dict': net.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'loss': loss,
        'iteration': attempt + 1
    }, 'final_checkpoint.pth')

def use_model():
    # Load the saved model
    net = ComplexNet(num_input=8, num_output=8, num_hidden_layers=6, hidden_layer_size=4)
    checkpoint = torch.load('final_checkpoint.pth')
    net.load_state_dict(checkpoint['model_state_dict'])

    # Use the model for predictions
    inputs = torch.rand(8)
    outputs = net(inputs)
    print("IN: ", inputs)
    for x in outputs.detach().cpu().numpy():
        print(x, end="| ")
    print("\n")


attps = []
opt = 0
inits = []

def continue_training():
    # Load the saved model and optimizer state
    net = ComplexNet(num_input=8, num_output=8, num_hidden_layers=6, hidden_layer_size=4)
    checkpoint = torch.load('checkpoint.pth')
    net.load_state_dict(checkpoint['model_state_dict'])
    optimizer = optim.SGD(net.parameters(), lr=0.01)
    optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
    iteration = checkpoint['iteration']
    loss = checkpoint['loss']

    # Continue training from the saved iteration number
    max_attempts = 20000  # Maximum number of training attempts
    save_interval = 1000  # Save the model and optimizer state every 1000 iterations
    for attempt in range(iteration, max_attempts):
        # Generate random input data
        inputs = torch.rand(8)

        optimizer.zero_grad()
        outputs = net(inputs)

        # Define the expected outputs
        expected_outputs = torch.tensor([360, 212, 13, 34, 2, 111, -360, -25], dtype=torch.float32)

        # Compute the loss between the model's output and the expected outputs
        loss = criterion(outputs, expected_outputs)

        # Backpropagation and optimization
        loss.backward()
        optimizer.step()

        # Append the loss to the list of losses
        attps.append(loss.item() % 100)

        # Save the model and optimizer state every 1000 iterations
        if (attempt + 1) % save_interval == 0:
            torch.save({
                'model_state_dict': net.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'loss': loss,
                'iteration': attempt + 1
            }, 'checkpoint.pth')

        # Check if the loss is below a certain threshold
        if loss.item() < 0.2:
            break

    print(f"Training completed in {attempt+1} attempts.")

    # Save the final model and optimizer state
    torch.save({
        'model_state_dict': net.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'loss': loss,
        'iteration': attempt + 1
    }, 'final_checkpoint.pth')

# Menu
while True:
    print("1. Train the model")
    print("2. Use the model for predictions")
    print("3. Continue training from a saved checkpoint")
    print("4. Exit")

    choice = input("Enter your choice: ")

    if choice == '1':
        train_model()
    elif choice == '2':
        use_model()
    elif choice == '3':
        continue_training()
    elif choice == '4':
        break
    else:
        print("Invalid choice. Please try again.")