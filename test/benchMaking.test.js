const {each, fill} = require('lodash');

describe(('BenchMark scripts testing'), () => {
  const data = fill(Array(98), 2);

  const loopsFunctions = {
    forOf: function (ToFill = []) {
      for(const key in data) {
        ToFill.push(data[key]);
      }
    },
    forPlusPlus: function (ToFill = []) {
      for(let i = 0; i < data.length; i++) {
        ToFill.push(data[i]);
      }
    },
    forEach: function (ToFill = []) {
      data.forEach(i => {
        ToFill[i];
      });
    },
    forIn: function (ToFill = []) {
      for(const key in data) {
        ToFill.push(data[key]);
      }
    },
    forMinus:  function (ToFill = []) {
      for (let i = data.length; i > 0; i--) { 
        ToFill.push(data[i]);
      }
    },
    lodashEach:  function (ToFill = []) {
      each(data, (val) => {
        ToFill.push(val);
      });
    }
  }

  it('loops benchMark tests, should show time to take to process an array', () => {
    
    console.time('for i++');
    loopsFunctions.forPlusPlus([]);
    console.timeEnd('for i++');

    console.time('.forEach');
    loopsFunctions.forEach([]);
    console.timeEnd('.forEach');

    console.time('for of');
    loopsFunctions.forOf([]);
    console.timeEnd('for of');

    console.time('for in');
    loopsFunctions.forIn([]);
    console.timeEnd('for in');

    console.time('for --');
    loopsFunctions.forMinus([]);
    console.timeEnd('for --')

    console.time('lodash each')
    loopsFunctions.lodashEach([]);
    console.timeEnd('lodash each');
    
  });
});