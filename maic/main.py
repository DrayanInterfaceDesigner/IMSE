from lib.connection import fetch
from lib.maic import MAIC
import multiprocessing
from lib.model import Model
from lib.mount import Mount
from lib.train import Train

def train_parallel(instance):
    print(instance)
    instance.run()

if __name__ == "__main__":
    
    # maic = MAIC(Model, Train)

    print("Don't panic, the app is starting. It can take long times, specially in older machines.")

    instances = []

    students = fetch("http://localhost:5500/api/students", {
        'method': 'GET',
        'headers': {'Content-Type': 'application/json'}
    })

    for student in students:
        net = Model(num_input=8, num_output=8)
        instances.append(
            Mount(student, net)
        )
    
    # for instance in instances:
    #     instance.train()
    
    pool = multiprocessing.Pool()
    pool.map(train_parallel, instances)
    pool.close()
    pool.join()

    # maic.parallelize()