const fs = require('fs/promises');
const getTalkers = require('./getTalkers');

module.exports = async (req, res) => {
  const talkers = await getTalkers();
  const { name, age, talk } = req.body;
  const newTalker = { name, age, talk, id: talkers.length + 1 };

  talkers.push(newTalker);
  fs.writeFile('talker.json', JSON.stringify(talkers));

  res.status(201).json(newTalker);
};