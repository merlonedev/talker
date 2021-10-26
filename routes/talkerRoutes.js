const express = require('express');
const { 
  getAllTalkers, 
  getTalkerById, 
  validateToken, 
  validateName, 
  validateTalk, 
  validateTalkDetails, 
  validateAge, 
} = require('../middlewares/talker');
const addTalker = require('../utils/addTalker');

const router = express.Router();

router.get('/:id', getTalkerById);

router.post('/', 
validateToken, 
validateName, 
validateAge, 
validateTalk, 
validateTalkDetails, 
addTalker);

router.get('/', getAllTalkers);

module.exports = router;
