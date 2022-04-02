const service = require('../services/userTweet.service');
const { users, tweets } = require('../../models');

const mockUserData = [
  {
    id: 1,
    name: 'Twitter Dev',
    screen_name: 'TwitterDev',
    location: 'Internet',
  },

  {

    id: 2,
    name: 'Lorem Ipsum',
    screen_name: 'LoremIpsum',
    location: 'Internet',

  }];
const mockUserTweetData = [{
  id: 1,
  createdAt: 'Thu Apr 06 15:24:15 +0000 2017',
  text: 'qwertyuiop',
},

{
  id: 2,
  createdAt: 'Thu Apr 06 19:24:15 +0000 2017',
  text: '1234567890',

}];

describe('getUsers', () => {
  it('should return all the users deatails', async () => {
    jest.spyOn(users, 'findAll').mockResolvedValue(mockUserData);
    const allUsers = await service.getUsers();
    expect(allUsers).toStrictEqual(mockUserData);
  });
});
describe('getTweets', () => {
  it('should return all tweets of a user', async () => {
    jest.spyOn(tweets, 'findAll').mockResolvedValue(mockUserTweetData);
    const userTweets = await service.getTweets(1);
    expect(userTweets).toStrictEqual(mockUserTweetData);
  });
});
describe('postTweets', () => {
  it('should return the newly created object  after adding a new tweet of a user', async () => {
    jest.spyOn(tweets, 'create').mockResolvedValue([{ text: 'hi', id: 1 }]);
    const newTweet = await service.postTweets('hi!!', 2);
    expect(newTweet).toStrictEqual([{ text: 'hi', id: 1 }]);
  });
});
