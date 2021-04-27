const teams = require('../teams')

const getTeams = (request, response) => {
  return response.send(teams)
}

const getTeamId = (request, response) => {
  const { id } = request.params
  const foundTeamId = teams.filter((team) => team.id == id)
  return response.send(foundTeamId)
}

module.exports = { getTeams, getTeamId }
