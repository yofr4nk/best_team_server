const fetch = require('node-fetch');
const xmlTojson = require('xml2json');

const getXmldata = () => {
  return fetch('https://s3.amazonaws.com/nunchee-fxassets-local/dump.xml')
  .then(function(response) {
    return response.text();
  })
  .then(function(myJson) {
    return parseXmlToJson(myJson);
  })
  .catch(function(error) {
    console.log('Something wrongs with Fetch request:' + error.message);
  });
}

const parseXmlToJson = (xmlData) => {
  try {
    return JSON.parse(xmlTojson.toJson(xmlData));
  } catch(err) {
    throw {
      code: 'migrationSeeder/parseXmlToJson',
      message: err.message
    }
  }
}

module.exports = {
  getXmldata,
  parseXmlToJson
}