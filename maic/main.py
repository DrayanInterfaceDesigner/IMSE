import connection
from maic import MAIC
import model
import train
import multiprocessing

def train_parallel(instance):
    print(instance)
    instance.train()

if __name__ == "__main__":
    
    maic = MAIC(model.Model, train.Train)
    instances = []

    students = connection.fetch("http://localhost:5500/api/students", {
        'method': 'GET',
        'headers': {'Content-Type': 'application/json'}
    })

    for student in students:
        instances.append(
            train.Train(maic, model.Model, student)
        )
    
    # for instance in instances:
    #     instance.train()
    
    pool = multiprocessing.Pool()
    pool.map(train_parallel, instances)
    pool.close()
    pool.join()

    maic.parallelize()