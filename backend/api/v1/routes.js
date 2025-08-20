const express = require('express');
const { memberRouter } = require('./Member/member.routes');
const { authRouter } = require('./auth/user.routes');
const { protectedMiddleware, restrictTo } = require('./middleware');

const apiRouter = express.Router();

apiRouter.use('/member', memberRouter);
apiRouter.use('/auth', authRouter);

module.exports = {
  apiRouter,
};
