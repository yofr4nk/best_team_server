const path = require('path');
const {array, exception, value} = require('unit.js');
const {
  playersByTeam, 
  pushParentToPlayers} = require(path.resolve('controllers', 'formatDataHandle'));
const {expectedPlayers, teamObjectWithChilds, jsonDataMock} = require(path.resolve('test', 'mockData'));

describe.only(('Controller testing'), () => {
  describe('playersByTeam testing', () => {
    it('playersByTeam should create a players array with its parents', () => {
      const mockDataTeams = jsonDataMock.sport.team;
      array(expectedPlayers).is(playersByTeam(mockDataTeams));
    });

    it('pushParentToPlayers should push the key parents to player list without parentId', () => {
      const playersWithParent = pushParentToPlayers(teamObjectWithChilds);
      array(playersWithParent).is(expectedPlayers);
    });
  });
});