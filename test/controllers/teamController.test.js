const path = require('path');
const {array, object, exception, value} = require('unit.js');
const {getPlayerFromTeams} = require(path.resolve('controllers', 'teamController'));
const {mongoTeamMockData} = require(path.resolve('test', 'mockData'));

describe(('Team Controller testing'), () => {
  it('getPlayerFromTeams should extract the players that are inside the teams', () => {
    const expectedPlayers = [ 
      "5b70fce3821cf0002f87c2b6",
      "5b70fce3821cf0002f87c2b7",
      "5b70fce3821cf0002f87c2b8",
      "5b70fce3821cf0002f87c2b9" ];
    const getPlayers = getPlayerFromTeams(mongoTeamMockData);
    array(getPlayers)
    .is(expectedPlayers)
    .hasLength(4);
  });

  it('getPlayerFromTeams should return an error if argument has wrong format', () => {
    let errorMsg;
    try {
      getPlayerFromTeams();
    } catch(err) {
      errorMsg = new Error(err);
    }
    exception(errorMsg);
		value(errorMsg).isInstanceOf(Error);
  });
});