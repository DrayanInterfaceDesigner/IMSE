const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const app = express()
const cors = require('cors')
// const {SQLJinn} = require('./modules/SQLJinn')

require('dotenv').config()
const addr = process.env.ADDRESS
const port = process.env.PORT
// const SJ = new SQLJinn('database.env')

app.use(cors())
app.use(bodyParser.json())

// ATTENTION! This server is HTTP only by now!

/*
  req example
  { uID: 1 }
  res example
  { uID: 1, session: 3, lastExperiment: 45}
  or something like that
*/
/* Get the user's ideal config.
  The server should know the session,
  it makes no sense for the UI to know it.
  The server receives the ID, gets its last session 
  from the DB, then returns it.

  Note: the ideal configuration must probably
  come from the \session#n\experiment.idealconfig.
  Because the idealconfig should change between the
  experiments to introduce variety. Giving the same
  ideal configuration for N experiments will 
  probably cause the AI to not generalize, but 
  get near 100% success rate for one specific 
  configuration.

*/
app.get('/api/:uID/idealconfig', (req, res) => {
  const { uID } = req.params
  const id = `${uID}`
  console.log(`Request Received: ${{...req}} | time: [ ${Date.now()} ]`)
  res.json({ uID: id, session: 3, lastExperiment: 45 })
})


const rand = () => {return Math.round(Math.random() * 360)}

const students = []
for(let x = 0; x < 5; x++) {
  const student = {
    id: x,
    input: [[0,0], [0,0]], //array of (x,y), 1º = arm, 2º = target
    expected: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()], //expected degrees for each part of the arm
    train: {lastErrorRate: 0, status: "inactive"} //train info
  }
  students.push(student)
}

app.get('/api/students', (req, res) => {
  console.log(`Request Received: ${{...req}} | time: [ ${Date.now()} ]`)
  res.json(students)
})


app.post('/api/results', (req, res) => {
  const data = req.body
  
  students.forEach(e => {
    if(e.id == data.id) {
      const update = { lastErrorRate: data.errorRate, status: data.status}
      e.train = update
      console.log("here", e)
    }
  })

  console.log(data.id, students.find(e => e.id === data.id))
  console.log('Received data:', req.body)
  res.json({ message: 'Data received successfully' })
})

// Perform your database operations here
console.log("performing things")


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


// Starts the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
