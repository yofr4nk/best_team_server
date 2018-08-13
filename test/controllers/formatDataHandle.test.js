const path = require('path');
const {array, object, exception, value} = require('unit.js');
const {
  playersByTeam, pushParentToPlayers, 
  getTeamData, parseTeamToObject,
  buildTeamSchemaDataPlayers, 
  buildTeamDataToSet, pushPlayerToTeam} = require(path.resolve('controllers', 'formatDataHandle'));
const {
  expectedPlayers, 
  teamObjectWithChilds, 
  jsonDataMock,
  expectedPlayersWithParents
} = require(path.resolve('test', 'mockData'));

describe(('Migration Parse Controller testing'), () => {
  describe('playersByTeam testing', () => {
    it('playersByTeam should create a players array with its parents', () => {
      const mockDataTeams = jsonDataMock.sport.team;
      array(expectedPlayers).is(playersByTeam(mockDataTeams));
    });

    it('pushParentToPlayers should push the key parents to player list without parentId', () => {
      const playersWithParent = pushParentToPlayers(teamObjectWithChilds);
      array(playersWithParent).is(expectedPlayersWithParents);
    });

    it('getTeamData should create a list of teams with _externalId field', () => {
      const mockDataTeams = [{
        "id": "4",
        "name": "D. Antofagasta",
        "country": "CL",
        "active": "false",
        "player": [
          {
            "id": "5",
            "name": "Carlos",
            "position": "Delantero"
          }
        ]
      },
      {
        "id": "5",
        "name": "Deportes Iquique",
        "country": "CL",
        "active": "false"
      }];
      
      const teamList = getTeamData(mockDataTeams);
      array(teamList).hasLength(2);
      array(teamList).contains([{ _externalId: '4', name: 'D. Antofagasta', active: 'false' }],
      [{ _externalId: '5', name: 'Deportes Iquique', active: 'false' }]);
    });

    it('parseTeamToObject should create an object with its team as key and the values are its players', () => {
      const mockDataTeams = [{
        "id": "4",
        "name": "D. Antofagasta",
        "country": "CL",
        "active": "false",
        "player": [
          {
            "id": "5",
            "name": "Carlos",
            "position": "Delantero"
          }
        ]
      },
      {
        "id": "5",
        "name": "Deportes Iquique",
        "country": "CL",
        "active": "false"
      }];
      
      const teamObject = parseTeamToObject(mockDataTeams);
      object(teamObject).isNotEmpty();
      object(teamObject).hasLength(1);
      object(teamObject).hasKey("4");
      array(teamObject['4']).hasLength(1);
    });

    it('buildTeamSchemaDataPlayers should create a players list from a team array where one its fields are its players', () => {
      const mockDataTeams = { '4': [ { id: '5', name: 'Carlos', position: 'Delantero' } ] };
      
      const teamObject = buildTeamSchemaDataPlayers(mockDataTeams);
      array(teamObject)
      .hasLength(1)
      .contains([{ id: '5', name: 'Carlos', position: 'Delantero' }]);
    });

    it('buildTeamDataToSet should group players by its team where each key contains a list of _id value', () => {
      const mockDataPlayers = [ { id: '1',
        name: 'Joaquin',
        position: 'Delantero',
        _externalId: '1',
        teamId: '2' 
      },{ id: '2',
        name: 'Daniel',
        position: 'Portero',
        _externalId: '2',
        teamId: '1' 
      }];

      const mockDataMongoDBPlayers = [ 
      { _id: 'FakeIdFromMongo',
        name: 'Joaquin',
        position: 'Delantero',
        _externalId: '1' 
      },{ _id: 'SecondFakeIdFromMongo',
        name: 'Daniel',
        position: 'Portero',
        _externalId: '2' 
      }];
      
      const groupPlayers = buildTeamDataToSet(mockDataMongoDBPlayers, mockDataPlayers);
      object(groupPlayers).isNotEmpty();
      object(groupPlayers).hasLength(2);
      object(groupPlayers)
      .hasKey("1")
      .hasKey("2");
    });

    it('buildTeamDataToSet should return an error if some param has not been passed', () => {
      let errorMsg;
      try {
       buildTeamDataToSet();
      } catch(err) {
        errorMsg = new Error(err);
      }
      exception(errorMsg);
		  value(errorMsg).isInstanceOf(Error);
    });

    it('pushPlayerToTeam should append players to each team if both match', () => {
      const teamsMock = [ 
        { _externalId: '1', name: 'D. Antofagasta', active: 'false' },
        { _externalId: '2', name: 'Deportes Iquique', active: 'false' }];
      const groupPlayersMock = { '1': [ 'SecondFakeIdFromMongo' ], '2': [ 'FakeIdFromMongo' ] }
      const appendPlayers = pushPlayerToTeam(teamsMock, groupPlayersMock);
      array(appendPlayers).matchEach(team =>{
        return groupPlayersMock[team._externalId][0] === team.players[0];
      });
    });
  });
});