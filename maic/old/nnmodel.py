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



