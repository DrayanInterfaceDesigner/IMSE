const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const { StudentFactory } = require('./modules/StudentFactory')
const { Queue } = require('./modules/Queue')
const {SQLJinn} = require('./modules/SQLJinn')

require('dotenv').config()

const addr = process.env.ADDRESS
const port = process.env.PORT
// const SJ = new SQLJinn('database.env')

app.use(cors())
app.use(bodyParser.json())

const getTime = ()=> {
  d = new Date()
  return `(UTC | hh:mm:ss:ms) ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}:${d.getUTCMilliseconds()}`
}


/* -----------HERE STARTS THE STUFF----------- */

// Creating(caching) fake students
const students = new StudentFactory()
students.makeFakeStudents()

/* 
  You can also use:
    students.populate(new SQLJinn(`env path`).query(`query here`))
  To get them from the DB instead.

  Warning, they must have this look (or be adapted later), to be used properly:
  {
    id: x, //array of (x,y), 1º = arm, 2º = target //expected degrees for each part of the arm
    train: {
        inputs: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()], 
        expected: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
        lastErrorRate: 0, output: [], status: "inactive"
    } //train info (BASE)
  }
*/

// Queue for cached students
const queue = new Queue()

/* ----------- ROUTES ----------- */

// ATTENTION! This server is HTTP only by now!

/*
  req example
  { uID: 1 }
  res example
  { uID: 1, session: 3, lastExperiment: 45}
  or something like that
*/

// Gets the ideal configuration for a specified student (ID)
app.get('/api/:uID/idealconfig', (req, res) => {
  const { uID } = req.params
  const id = `${uID}`
  console.log(`[${uID}/idealcondfig] Request Received: ${{...req}} | time: [ ${getTime()} ]`)
  res.json({ uID: id, session: 3, lastExperiment: 45 })
})


// Gets ALL students
app.get('/api/students', (req, res) => {
  console.log(`[/students] Request Received: ${{...req}} | time: [ ${getTime()} ]`)
  res.json(students.getFakeStudents())
})


// Gets the last enqueued student
app.get('/api/peek', (req, res) => {
  console.log(`[/peek] Request Received: ${{...req}} | time: [ ${getTime()} ]`)
  const response = {
    isEmpty: queue.isEmpty(),
    enqueued: queue.peek()?.value || null
  }
  res.json(response)
})


// Dequeues the FIFO student
app.get('/api/dequeue', (req, res) => {
  console.log(`[/dequeue] Request Received: ${{...req}} | time: [ ${getTime()} ]`)
  queue.dequeue()
  res.json({ message: 'Dequeued successfully!' })
})


// Updates a cache-stored student if the received student exists.
app.post('/api/results', (req, res) => {
  const data = req.body
  
  students.updateStudent(data, queue)

  console.log(`[/results] Received data. | time: [ ${getTime()} ]`)
  res.json({ message: 'Data received successfully' })
})

/* ----------- EXPERIMENTAL ----------- */

  // students.forEach(e => {
  //   if(e.id == data.id) {
  //     const update = { lastErrorRate: data.errorRate, status: data.status}
  //     e.train = update
  //     console.log("here", e)
  //   }
  // })
  // students.find(e => e.id === data.id)

// Perform your database operations here
// console.log("performing things")


// Fetch all students from the "students" table
// connection.query('SELECT * FROM students', (err, results) => {
//   if (err) {
//     console.error('Error executing the query:', err);
//     return;
//   }

//   console.log('List of students in JSON format:');
//   const studentsJSON = JSON.stringify(results);
//   console.log(studentsJSON);

//   // Close the connection after the query
//   connection.end();
// });

// SJ.query('SELECT * FROM students').then(res => {
//   console.log(res)
// })


// // const SJ = new SQLJinn('database.env') ta lá em cima
// const QUERY_pegarExperimentos = `
// SELECT students.id AS student_id, experiments.*
// FROM students
// LEFT JOIN experiments ON students.id = experiments.student_id;

// `
// SJ.query(QUERY_pegarExperimentos).then(res => {
//   const results = res.reduce((acc, item) => {
    
//     if(item.student_id) {
//       const student = acc.find((s) => s.student_id === item.student_id)
  
//       if (student) {
//         student.experiments.push({
//           experiment_id: item.experiment_id,
//           info: item.info,
//         })
//       } else {
//         acc.push({
//           student_id: item.student_id,
//           experiments: [
//             {
//               experiment_id: item.experiment_id,
//               info: item.info,
//             },
//           ],
//         })
//       }
//     }
//     return acc
//   }, [])

//   console.log(JSON.stringify(results))
// })





// When done, close the connection
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing the connection:', err);
//     return;
//   }
//   console.log('Connection closed');
// });


/* ----------- STARTS THE SERVER ----------- */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
  console.log(`
    | \x1b[36m Avaliable Routes \x1b[0m|
    \n    ==========================\n
      \x1b[33m /api/:uID/idealconfig
      \x1b[36m Description:  Gets the ideal configuration for a specified student (ID)\x1b[0m
    \n    ==========================

      \x1b[33m /api/students
      \x1b[36m Description:  Gets ALL students\x1b[0m
    \n    ==========================

      \x1b[33m /api/peek
      \x1b[36m Description:  Gets the last enqueued student\x1b[0m
    \n    ==========================

      \x1b[33m /api/dequeue
      \x1b[36m Description:  Dequeues the FIFO student\x1b[0m
    \n    ==========================

      \x1b[33m /api/results
      \x1b[36m Description:  Updates a cache-stored student if the received student exists.\x1b[0m
    \n    ==========================\n
  `)
})



