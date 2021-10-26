const randomToken = require('random-token')
  .create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

const validateEmail = (req, res, next) => {
  const EMAIL_REGEX = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/i;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.match(EMAIL_REGEX)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  next();
};

const login = (_req, res, next) => {
  const token = randomToken(16);
  res.status(200).json({ token });

  next();
};

module.exports = {
  validateEmail, validatePassword, login,
};