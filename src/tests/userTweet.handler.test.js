const services = require('../services/userTweet.service');
const handlers = require('../handlers/userTweet.handler');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const res = mockResponse();
describe('getUsers', () => {
  it('should give a response with status code 200 after fetching users data', async () => {
    const users = [{ name: 'kiran', id: 1, handle: '@acd' }];
    jest.spyOn(services, 'getUsers').mockResolvedValue(users);
    await handlers.getUsers(null, res);
    expect(res.json).toHaveBeenCalledWith({ users });
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it('should give an error message if something failed', async () => {
    jest.spyOn(services, 'getUsers').mockRejectedValue(new Error('some error!'));
    try {
      await handlers.getUsers(null, res);
    } catch (err) {
      expect(res.json).toHaveBeenCalledWith({ message: 'some error' });
    }
  });
});

describe('getTweets', () => {
  it('should  return all tweets of a user', async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const result = [{ id: 1, text: 'hi!!' }];
    const getTweetsMock = jest.spyOn(services, 'getTweets').mockResolvedValue(result);
    await handlers.getTweets(req, res);
    expect(res.json).toHaveBeenCalledWith({ result });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(getTweetsMock).toHaveBeenCalledWith(req.params.id);
  });
  it('should give an error message if Id is not of valid type', async () => {
    const req = {
      params: {
        id: '1',
      },
    };
    jest.spyOn(services, 'getTweets').mockRejectedValue(new Error('some Error'));
    try {
      await handlers.getTweets(req, res);
    } catch (err) {
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid!Id must be a valid integer' });
      expect(res.status).toHaveBeenCalledWith(400);
    }
  });
});
describe('postTweets', () => {
  it('should return the new tweet that has been added in tweet table', async () => {
    const req = {
      params: {
        id: 1,
      },
      body: {
        text: 'hi!!!',
      },
    };
    const result = [{ id: 1, text: 'hiii' }];
    const mockPostTweet = jest.spyOn(services, 'postTweets').mockResolvedValue(result);
    await handlers.postTweets(req, res);
    expect(res.json).toHaveBeenCalledWith({ result });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockPostTweet).toHaveBeenCalledWith(req.params.id, req.body.text);
  });
});
