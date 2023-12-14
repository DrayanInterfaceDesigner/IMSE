from lib.connection import fetch
from lib.maic import MAIC
import multiprocessing
from lib.model import Model
from lib.mount import Mount
from lib.train import Train
import random

def train_parallel(instance):
    instance.run()

if __name__ == "__main__":
    
    # maic = MAIC(Model, Train)

    print("Don't panic, the app is starting, but it can take a while.")

    instances = []

    students = fetch("http://localhost:5500/api/students", {
        'method': 'GET',
        'headers': {'Content-Type': 'application/json'}
    })

    for student in students:
        net = Model(num_input=8, num_output=8, num_hidden_layers=random.randint(2, 16), hidden_layer_size=random.randint(32, 256))
        instances.append(
            Mount(student, net, graph=True)
        )
    
    # for instance in instances:
    #     instance.train()
    
    pool = multiprocessing.Pool()
    pool.map(train_parallel, instances)
    pool.close()
    pool.join()

    # maic.parallelize()