
const path = require('path');
const {getXmldata} = require(path.resolve('scripts', 'migrationSeeder'));
const {Team} = require(path.resolve('models', 'Team'));
const {Player, insertPlayers} = require(path.resolve('models', 'Player'));
const {map, find} = require('lodash');

const getTeamData = (teamsToCreate) => {
  return teamsToCreate.map(teamToCreate => {
    return {
      _externalId: teamToCreate.id,
      name: teamToCreate.name,
      active: teamToCreate.active
    }
  });
}

const playersByTeam = (teams) => {
  const reducerTeam = parseTeamToObject(teams);
  return buildTeamSchemaDataPlayers(reducerTeam);
}

const parseTeamToObject = (teams) => {
  const reducerTeam = {};
  for(const team of teams) {
    if(!reducerTeam[team.id] && team.player) {
      reducerTeam[team.id] = team.player;
    }
  }
  return reducerTeam;
}

const buildTeamSchemaDataPlayers = (teams) => {
  const playersWithParent = [];
  for(const team in teams) {
    for(const playerIndex in teams[team]) {
      teams[team][playerIndex]._externalId = teams[team][playerIndex].id;
      playersWithParent.push(teams[team][playerIndex]);
    }
  }
  return playersWithParent;
}

const pushParentToPlayers = (teams) => {
  const playersWithParent = [];
  for(const team in teams) {
    for(const playerIndex in teams[team]) {
      teams[team][playerIndex]._externalId = teams[team][playerIndex].id;
      teams[team][playerIndex].teamId = team;
      playersWithParent.push(teams[team][playerIndex]);
    }
  }
  return playersWithParent;
}

const runSeedFromXmlData = async (ctx) => {
  return Promise.all([
    Player.remove({}),
    Team.remove({})
  ]).then(async () => {
    const data = await getXmldata();
    const getTeams = getTeamData(data.sport.team);
    const players = await insertPlayers(playersByTeam(data.sport.team));
    return saveTeamList(data.sport.team, getTeams, players)
      .then((teams) => {
        ctx.body = setTeamToPlayers(teams);
      });
  })
  .catch(err => {
    return new Error(err);
  });
  
}

const pushPlayerToTeam = (teams, playerTeamRelation) => {
  return map(teams, team => {
    if(playerTeamRelation[team._externalId]) {
      team.players = playerTeamRelation[team._externalId];
    }
    return team;
  });
}

const buildTeamDataToSet = (players, playerData) => {
  const teamPlayerReducer = playerData.reduce((playerGroup, player) => {
    const findPlayer = find(players, {_externalId: player._externalId});
    if(!playerGroup[player.teamId]) {
      playerGroup[player.teamId] = [];
    }
    playerGroup[player.teamId].push(findPlayer._id);
    return playerGroup;
  }, {});
  return teamPlayerReducer;
}

const saveTeamList = async (teamsFromXml, teamstoSave, playersToSet) => {
  try {
    const teamObjectData = parseTeamToObject(teamsFromXml);
    const playerData = pushParentToPlayers(teamObjectData);
    const buildTeamData = buildTeamDataToSet(playersToSet, playerData);
    const teamDataToSave = pushPlayerToTeam(teamstoSave, buildTeamData);
    return Team.insertMany(teamDataToSave);
  } catch(err) {
    return new Error(err);
  }
}

const setTeamToPlayers = (teams) => {
  try {
    const bulkPlayer = Player.collection.initializeOrderedBulkOp();
    for(const team of teams) {
      if(team.players.length > 0) {
        bulkPlayer.find({'_id': {$in: team.players}}).update({$set: {team: team._id}});
        bulkPlayer.execute((err) => {
          if(err) return new Error(err);
        });
      }
    }
    return 'XML data uploaded';
  } catch(err) {
    return new Error(err);
  }
}

module.exports = {
  runSeedFromXmlData,
  playersByTeam,
  pushParentToPlayers,
  getTeamData,
  parseTeamToObject,
  buildTeamSchemaDataPlayers,
  buildTeamDataToSet,
  pushPlayerToTeam
}