const services = require('../services/userTweet.service');
const InputError = require('../../errors/inputError');

const getUsers = async (req, res) => {
  try {
    const users = await services.getUsers();
    res.json({ users }).status(200);
  } catch (err) {
    res.json({ message: err.message });
  }
};
const getTweets = async (req, res) => {
  const { id } = req.params;

  try {
    if (typeof parseInt(id, 10) !== 'number') {
      throw new InputError('Bad Request', 'Invalid!Id must be a valid integer', 400);
    }
    const result = await services.getTweets(id);

    res.json({ result }).status(200);
  } catch (err) {
    if (err instanceof InputError) {
      res.json({ message: err.message }).status(err.httpCode);
    } else {
      res.json({ message: err.message });
    }
  }
};

const postTweets = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  const newTweet = req.body.text;
  try {
    if (typeof parseInt(id, 10) !== 'number') {
      throw new InputError('Bad Request', 'Invalid!Id must be a valid integer', 400);
    }
    if (!newTweet) {
      throw new InputError('Bad request', 'Invalid!User must enter a text', 400);
    }
    if (typeof parseInt(id, 10) !== 'number') {
      throw new InputError('Bad Request', 'Invalid!Id must be a vaild integer', 400);
    }

    const result = await services.postTweets(id, newTweet);
    res.json({ result }).status(200);
  } catch (err) {
    if (err instanceof InputError) {
      res.json({ message: err.message }).status(err.httpCode);
    } else {
      res.json({ message: err.message });
    }
  }
};

module.exports = {
  getTweets, getUsers, postTweets,
};
