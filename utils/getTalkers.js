const fs = require('fs/promises');

module.exports = () => fs.readFile('talker.json', 'utf-8')
  .then((talkers) => JSON.parse(talkers));