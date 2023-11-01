from lib.model import Model
from lib.mount import Mount
from lib.connection import fetch
import torch

student = {'name': 'labrat', 'id': 4, 'input': torch.rand(8), 'expected': [279, 294, 246, 7, 48, 268, 318, 307], 'train': {'lastErrorRate': 0.0020134998485445976, 'status': 'finished'}}
students = fetch("http://localhost:5500/api/students", {
        'method': 'GET',
        'headers': {'Content-Type': 'application/json'}
})

net = Model(num_input=8, num_output=8)
m = Mount(students[0], net, max_epochs=2000, graph=False)
m.run()