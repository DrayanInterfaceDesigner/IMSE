class StudentFactory {
    constructor(){
        this.students = new Array()
    }

    populate(students) {
        this.students = students
    }

    makeFakeStudents() {
        const rand = () => {return Math.round(Math.random() * 360)}

        for(let x = 0; x < 5; x++) {
            const student = {
                id: x, //array of (x,y), 1º = arm, 2º = target //expected degrees for each part of the arm
                train: {
                    inputs: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()], 
                    expected: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
                    lastErrorRate: 0, 
                    output: [], 
                    status: "inactive"
                } //train info
            }
            this.students.push(student)
        }
        return this
    }

    updateStudent(student, queue) {
        this.students.forEach(e => {
            if(e.id == student.id) {
              const update = { ...e.train, output: student.output, lastErrorRate: student.errorRate, status: student.status}
              e.train = update

              if(update.status == "finished") queue.enqueue(e)
            }
        })
        return this
    }

    getStudent(id) {
        return this.students.find(e => e.id === id)
    }

    getFakeStudents() {
        return this.students
    }
}

module.exports = {StudentFactory}