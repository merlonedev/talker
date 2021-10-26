const getTalkers = require('../utils/getTalkers');

const getAllTalkers = async (_req, res) => {
  const talkers = await getTalkers();
  res.status(200).json(talkers);
};

const getTalkerById = async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  
  const oneTalker = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!oneTalker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(oneTalker);
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const TOKEN_REGEX = /^[a-z0-9]{16}$/i;
  if (!authorization) res.status(401).json({ message: 'Token não encontrado' });

  if (!authorization.match(TOKEN_REGEX)) res.status(401).json({ message: 'Token inválido' });

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  console.log(req.body);
  if (!name) res.status(400).json({ message: 'O campo "name" é obrigatório' });
  
  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk || !talk.watchedAt || !talk.rate) {
    res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }
  
  next();
};

const validateTalkDetails = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const DATE_REGEX = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  
  if (!watchedAt.match(DATE_REGEX)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (Number.isNaN(rate) || rate < 1 || rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDetails,
};