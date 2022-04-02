const services = require('../services/loadData.services');
const handler = require('../handlers/loadData.handler');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const res = mockResponse();
describe('loadData', () => {
  it('should return response message with status code 200 if data is successfully loaded', async () => {
    jest.spyOn(services, 'loadData').mockResolvedValue('successfully loaded');
    await handler.loadData(null, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'successfully loaded' });
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it('should return error message with appropriate status code if an error occurs', async () => {
    try {
      jest.spyOn(services, 'loadData').mockRejectedValue(new Error('Some error!'));
      await handler.loadData(null, res);
    } catch (err) {
      expect(res.json).toHaveBeenCalledWith({ message: 'Some error!' });
    }
  });
});
// npx jest.cmd filename
