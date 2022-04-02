const { users, tweets } = require('../../models');

const getUsers = async () => {
  const Allusers = await users.findAll({
    attributes: ['id', 'name', 'handle', 'location'],
  });
  console.log(Allusers);
  return Allusers;
};
const getTweets = async (Id) => {
  const userTweet = await tweets.findAll({
    attributes: ['id', 'text', 'createdAt'],
    where: {
      userId: Id,
    },
    order: [['createdAt', 'DESC']],
  });
  return userTweet;
};
const postTweets = async (Id, newTweet) => {
  console.log(Id);
  const Tweet = await tweets.create({ text: newTweet, userId: Id });

  return Tweet;
};
module.exports = {
  getUsers, getTweets, postTweets,
};
