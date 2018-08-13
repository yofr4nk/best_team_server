const path = require('path');
const {Team} = require(path.resolve('models', 'Team'));
const {Player} = require(path.resolve('models', 'Player'));
const {head} = require('lodash');
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
  const playerPosition = ctx.params.position;
  return new Promise(function(resolve, reject) {
    if(!ctx.params.position) return reject('You need pass a position');
    const teams = Team.find({
      active: true
    });
    return resolve(teams);
  }).then(activeTeam => {
    return getPlayerFromTeams(activeTeam);
  }).then(filterPlayers => {
    return Player.find({
      _id: filterPlayers,
      position: playerPosition
    }).populate('team');
  })
  .then(players => {
    ctx.body = players;
  })
  .catch(err => {
    return new Error(err);
  });
}

const getPlayerFromTeams = (teams) => {
  try {
    const teamsLength = teams.length;
    const playersToGet = [];
    for(let i = 0; i < teamsLength; i++) {
      if(teams[i].players.length > 0) {
        playersToGet.push(teams[i].players);
      }
    }
    return head(playersToGet);
  } catch(err) {
    return new Error(err);
  }
}

module.exports = {
  getTeams,
  getTeamPlayers,
  getPlayersPosition,
  getPlayerFromTeams
}