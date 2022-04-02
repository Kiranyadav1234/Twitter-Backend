const express = require('express');
const handler = require('../handlers/userTweet.handler');
const dataHandler = require('../handlers/loadData.handler');

const userTweetRouter = express.Router();

userTweetRouter.get('/', handler.getUsers);
userTweetRouter.get('/:id/tweets', handler.getTweets);
userTweetRouter.post('/:id/tweets', handler.postTweets);
const loadDatatRouter = express.Router();
loadDatatRouter.post('/', dataHandler.loadData);

module.exports = {
  userTweetRouter,
  loadDatatRouter,
};
