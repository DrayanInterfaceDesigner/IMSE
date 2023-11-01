from lib.model import Model
from lib.mount import Mount
import torch

student = {'name': 'labrat', 'id': 4, 'input': torch.rand(8), 'expected': [279, 294, 246, 7, 48, 268, 318, 307], 'train': {'lastErrorRate': 0.0020134998485445976, 'status': 'finished'}}
net = Model(num_input=8, num_output=8)
m = Mount(student, net, max_epochs=2000)
m.run()