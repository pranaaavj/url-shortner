const express = require('express');
const {
  handlerUserSignUp,
  handlerUserLoginIn,
} = require('../controllers/user');

const router = express.Router();

router.post('/', handlerUserSignUp);

router.post('/login', handlerUserLoginIn);

module.exports = router;
