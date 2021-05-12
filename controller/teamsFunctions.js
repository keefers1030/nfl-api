/* eslint-disable no-console */
// const teams = require('../teams')
const models = require('../models')

const getAllTeams = async (req, res) => {
  const teams = await models.teams.findAll()

  return res.send(teams)
}
const getTeamById = async (req, res) => {
  // const teamID = teams.find((team) => team.id === parseInt(req.params.id))
  const { id } = req.params
  const teams = await models.teams.findOne({ where: { id } })

  return teams ? res.send(teams) : res.sendStatus(404)
}

const addNewTeam = async (req, res) => {
  const {
    location, mascot, abbreviation, conference, division
  } = req.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    res.status(400).send('Must contain all inputs')
  }

  const newTeam = { location, mascot, abbreviation, conference, division }

  const team = await models.teams.create(newTeam)

  return res.status(201).send(team)
}

module.exports = { getAllTeams, getTeamById, addNewTeam }
