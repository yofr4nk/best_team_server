const path = require('path');
const {object, exception, value} = require('unit.js');
const {parseXmlToJson} = require(path.resolve('scripts', 'migrationSeeder'));

describe(('Helper scripts testing'), () => {
  describe('migrationSeeder testing', () => {
    it('parseXmlToJson method should parse any xml response data to JSON', () => {
      const xmlDataMock = '<root>Here you go xml!</root>'
      const expectedJSON = {
        "root": 
        "Here you go xml!"
      };
      const xmlToJson = parseXmlToJson(xmlDataMock);
      object(xmlToJson).is(expectedJSON);
    });

    it('parseXmlToJson method should return an error when data to format is not a XML', () => {
      const wrongFormatToXML = '{root: Hey, this one is not a XML}';
      let errorMsg;
      try {
        parseXmlToJson(wrongFormatToXML)
      } catch (err) {
        errorMsg = new Error(err);
      }
      exception(errorMsg);
		  value(errorMsg).isInstanceOf(Error);
    });
  });
});