const mongoose = require('mongoose');
const {runSeedFromXmlData} = require('../controllers/formatDataHandle');

const mongoDBConnect = () => {
  return mongoose.connect('mongodb://dbmongo/best_team', function (err) {
    if (err) throw err;
    runSeedFromXmlData();
    console.log('Mongodb Successfully connected');
  });
}

module.exports = {
  mongoDBConnect
}