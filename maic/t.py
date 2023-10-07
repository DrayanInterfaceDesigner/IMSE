import connection
from maic import MAIC
import model
import train
import multiprocessing


def worker_function(instance):
    print( instance + 1)

if __name__ == "__main__":
    # Create a pool of processes
    pool = multiprocessing.Pool()
    maic = MAIC(model.Model, train.Train)
    students = connection.fetch("http://localhost:5500/api/students", {
        'method': 'GET',
        'headers': {'Content-Type': 'application/json'}
    })

    instances = []
    for student in students:
        instances.append(
            train.Train(maic, model.Model, student)
        )
    # Define a list of values to process
    values = [1, 2, 3, 4, 5]

    # Use the pool to map the worker function to the values
    pool.map(worker_function, values)

    # Close the pool and wait for the worker processes to finish
    pool.close()
    pool.join()