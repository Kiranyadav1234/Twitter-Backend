const { users, tweets } = require('../../models');
const services = require('../services/loadData.services');

const userData = [{

  name: 'Twitter Dev',
  handle: 'TwitterDev',
  location: 'Internet',
}, {

  name: 'Lorem Ipsum',
  handle: 'LoremIpsum',
  location: 'Internet',
}];
const mockUserData = [
  {
    created_at: 'Thu Apr 06 15:24:15 +0000 2017',
    text: 'Hello nice to meet you!',
    user: {
      id: 1,
      name: 'Twitter Dev',
      screen_name: 'TwitterDev',
      location: 'Internet',
    },
  },
  {
    created_at: 'Thu Apr 06 15:24:15 +0000 2017',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    user: {
      id: 2,
      name: 'Lorem Ipsum',
      screen_name: 'LoremIpsum',
      location: 'Internet',
    },
  }];

describe('loadUserData', () => {
  it('should load the data in users table and return succesful message', async () => {
    jest.spyOn(users, 'destroy').mockResolvedValue([]);
    jest.spyOn(users, 'bulkCreate').mockResolvedValue([]);
    const message = await services.loadUserData(userData);
    expect(message).toBe('successfully loaded');
  });
});
describe('getUserData', () => {
  it('should return the formatted user data ', () => {
    const Data = services.getUserData(mockUserData);
    expect(Data).toStrictEqual(userData);
  });
});
