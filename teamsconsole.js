const teams = require('./teams')

teams.forEach(team => {
  // eslint-disable-next-line max-len
  console.log(`('${team.location}', '${team.mascot}', '${team.abbreviation}', '${team.conference}', '${team.division}' ),`)
})
