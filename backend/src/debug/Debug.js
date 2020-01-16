const moment = require('moment');

function dbg(data) {
  const dateTime = moment().format('MM/DD/YYYY H:mm:ss');
  console.log(dateTime + ' DEBUG: ' + JSON.stringify(data));
}

module.exports = {
  dbg
}
