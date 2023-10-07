const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const addr = process.env.ADDRESS
const port = process.env.PORT


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

const students = []
for(let x = 0; x < 5; x++) {
  const student = {
    id: x,
    input: [[0,0], [0,0]], //array of (x,y), 1º = arm, 2º = target
    expected: [45, 90, 360, 190, 140], //expected degrees for each part of the arm
    train: {} //train info
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
      const update = { lastErrorRate: data.errorRate, finished: data.finished}
      e.train = update
      console.log("here", e)
    }
  })

  console.log(data.id, students.find(e => e.id === data.id))
  console.log('Received data:', req.body)
  res.json({ message: 'Data received successfully' })
})

// Starts the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
