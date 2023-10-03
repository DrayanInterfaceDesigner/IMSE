const express = require('express')
const app = express()
require('dotenv').config()
const addr = process.env.ADDRESS
const port = process.env.PORT

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
})

// Starts the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
