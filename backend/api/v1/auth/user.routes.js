const express = require('express');
const { userSignUpController, userLoginController } = require('./user.controller');

const authRouter = express.Router();

authRouter.post('/signup', userSignUpController);
authRouter.post('/login', userLoginController);

module.exports = {
  authRouter,
};
