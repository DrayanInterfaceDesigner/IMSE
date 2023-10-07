import connection
from maic import MAIC
import model
import train

def main():
    maic = MAIC(model.Model, train.Train)
    students = connection.fetch("http://localhost:5500/api/students")

    for student in students:
        maic.add_instance(student)
    
    maic.parallelize()
