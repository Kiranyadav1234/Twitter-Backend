const tweetsData = require('../constants/tweets.json');
const { users, tweets } = require('../../models');

let isUserIdLoaded = false;
/* const setIsUserIdLoaded = (userBool) => {
  isUserIdLoaded = userBool;
}; */
/* const getIsUserIdLoaded = () => isUserIdLoaded; */

const loadUserData = async (userData) => {
  await users.destroy({
    truncate: true,
    cascade: true,
  });
  await users.bulkCreate(userData);
  return Promise.resolve('successfully loaded');
};
const getUserData = (Data) => {
  const uniqueUser = {};
  const userData = Data.reduce((prevValue, eachUser) => {
    if (!uniqueUser[eachUser.user.screen_name]) {
      const data = {
        name: eachUser.user.name,
        handle: eachUser.user.screen_name,
        location: eachUser.user.location,
      };
      uniqueUser[eachUser.user.screen_name] = true;
      prevValue.push(data);
    }
    return prevValue;
  }, []);

  return userData;
};
const dbGetUserId = async () => {
  const result = await users.findAll({
    raw: true, // raw for getting data without datavalues
    attributes: ['id', 'handle'],
  });

  return result;
  // [datavalues:{}]
};
const loadTweetData = async (tweetData) => {
  await tweets.destroy({
    truncate: true,
    cascade: true,
  });
  await tweets.bulkCreate(tweetData);
  return Promise.resolve('successfully loaded');
};
const getUserId = async (userHandle) => {
  let userIds;
  if (!isUserIdLoaded) {
    userIds = await dbGetUserId();
    isUserIdLoaded = true;
  }

  return userIds.filter((eachUserid) => eachUserid.handle === userHandle);
};

const getTweetData = async () => {
  let userId;
  const tweetData = await Promise.all(tweetsData.map(async (eachTweet) => {
    userId = await getUserId(eachTweet.user.screen_name);
    userId = userId[0].id;
    const tweet = {
      text: eachTweet.text,
      userId,
    };
    return tweet;
  }));
  return tweetData;
};

const loadData = async () => {
  await loadUserData(getUserData(tweetsData));
  await loadTweetData(await getTweetData(tweetsData));
  return 'successfully loaded';
};
module.exports = {
  loadData,
  getUserData,
  loadUserData,
  getTweetData,
  getUserId,
  dbGetUserId,
};
// do we have to pass every function for testing
