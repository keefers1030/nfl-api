const express = require('express')
const bodyParser = require('body-parser')
const { getAllTeams, getTeamById, addNewTeam } = require('./controller/teamsFunctions')

const app = express()

const PORT = 1340

app.get('/teams', getAllTeams)

app.get('/teams/:id', getTeamById)

app.post('/teams', bodyParser.json(), addNewTeam)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
})

