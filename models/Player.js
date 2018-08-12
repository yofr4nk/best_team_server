const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  "_externalId": {
    type: String
  },
  name: {
    type: String
  },
  position: {
    type: String
  },
  "team": { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team'
  }
},
{ toObject : {virtuals: true} }, { toJSON: { virtuals: true } });

PlayerSchema.virtual('teamParent', {
  ref: 'Team',
  localField: 'team',
  foreignField: '_id',
  justOne: false
});

const Player = mongoose.model('Player', PlayerSchema);

const insertPlayers = (players) => {
  try{
    return Player.insertMany(players)
  } catch(err) {
    console.log(err);
  }
}

const appendTeamToPlayer = (teams) => {
  /*try{
    return Team.insertMany(teams);
  } catch(err) {
    console.log(err);
  }*/
  return [];
}

module.exports = {
  Player,
  insertPlayers,
  appendTeamToPlayer
}