const mongoose = require("mongoose");

delete mongoose.connection.models['Player'];
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
});

const Player = mongoose.model('Player', PlayerSchema);

const insertPlayers = (players) => {
  try{
    return Player.insertMany(players)
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  Player,
  insertPlayers
}