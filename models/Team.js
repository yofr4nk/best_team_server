const mongoose = require("mongoose");

delete mongoose.connection.models['Team'];
const TeamSchema = new mongoose.Schema({
  "_externalId": {
    type: String
  },
  name: {
    type: String
  },
  "active": Boolean,
  "players": {
    type: Array({ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Player' 
    })
  }
});

const Team = mongoose.model('Team', TeamSchema);

const insertTeams = (teams) => {
  try{
    return Team.insertMany(teams, (err, teams) => {
      if(err) return new Error(err);
      return teams;
    });
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  insertTeams,
  Team
}