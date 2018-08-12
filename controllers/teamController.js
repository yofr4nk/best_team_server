const path = require('path');
const {Team} = require(path.resolve('models', 'Team'));

const getTeams = async (ctx) => {
  ctx.body = {
    teams: await Team.find()
  }
}

const getTeamPlayers = async (ctx) => {
  const playersTeam = await Team.findOne({
    _externalId: ctx.params.idTeam
  }).populate('players');

  ctx.body = {
    team: playersTeam.name,
    players: playersTeam.players
  }
}

const getPlayersPosition = async (ctx) => {
  ctx.body = ctx.params.position;
  return new Promise(function(resolve, reject) {
    if(!ctx.params.position) return reject('You need pass a position');
    const teams = Team.find({
      active: true
    });
    return resolve(teams);
  }).then(activeTeam => {
    ctx.body = activeTeam;
  });
}

module.exports = {
  getTeams,
  getTeamPlayers,
  getPlayersPosition
}