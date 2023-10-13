import connection
from maic import MAIC
import train
import multiprocessing
from model import Model
from mount import Mount

def train_parallel(instance):
    print(instance)
    instance.run()

if __name__ == "__main__":
    
    maic = MAIC(Model, train.Train)
    instances = []

    students = connection.fetch("http://localhost:5500/api/students", {
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

    maic.parallelize()