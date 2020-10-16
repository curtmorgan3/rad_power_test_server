const { BadRequest } = require('../utils/errors');
const { definitions } = require('../utils/definitions');

const getEntries = (num) => {
  if (!num || !num.serials || typeof num.serials !== 'string') {
    throw new BadRequest('Must provide a property serial of type string.');
  }

  const serialNumbers = num.serials.split(',').map(num => num.trim());
  let allVerified = true;
  serialNumbers.forEach(num => {
    if (num.length !== 13) allVerified = false;
  });

  if (!allVerified) {
    throw new BadRequest('Expected each serial number to be 13 characters.');
  }

  /*
    Right around here is where we'd try to fetch entries from a DB to verify the 
    serial number provided is present.
  */

  const entries = serialNumbers.map(entry => parseSerialNumber(entry));

  return entries;
}

function parseSerialNumber(num) {
  const modelCode = num.charAt(0);
  const model = definitions.models[modelCode] ? definitions.models[modelCode] : 'Unknown';

  const modelYearCode = num.charAt(1);
  const modelYear = definitions.modelYears[modelYearCode] ? definitions.modelYears[modelYearCode] : 'Unknown';

  const manMonthCode = num.charAt(2);
  const manufacturedMonth = definitions.manMonths[manMonthCode] ? definitions.manMonths[manMonthCode] : 'Unknown';

  const manYearCode = num.charAt(3) + num.charAt(4);
  const manufacturedYear = parseInt(manYearCode) > 21 ? 'Unknown' : `20${manYearCode}`;

  const factoryCode = num.charAt(5);
  const assemblyPlant = definitions.assemblyPlants[factoryCode] ? definitions.assemblyPlants[factoryCode] : 'Unknown';

  // Only supports single digit version numbers
  // Future versions should account for this
  const version = parseInt(num.charAt(6));

  let unique = num.slice(7);
  const uniqueNumeric = unique.match(/[\d]+/g);
  if (!uniqueNumeric || !uniqueNumeric[0] || uniqueNumeric[0].length !== 6) {
    unique = 'Unknown format -- unique identifier should be six numeric digits.';
  }

  return {
    model,
    manufacturedMonth,
    manufacturedYear,
    modelYear,
    assemblyPlant,
    version,
    unique,
  }
}

module.exports = {
  getEntries
}