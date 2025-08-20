const express = require('express');
const {
  addMember,
  getHubMembers,
  deleteMember,
} = require('./member.controller');
const { protectedMiddleware, restrictTo } = require('../middleware');

const memberRouter = express.Router();

memberRouter.post('/add', addMember);
memberRouter.get('/:hub', getHubMembers);
memberRouter.delete('/:memId', deleteMember);

module.exports = {
  memberRouter,
};
