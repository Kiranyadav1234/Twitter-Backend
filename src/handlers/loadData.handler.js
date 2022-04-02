const services = require('../services/loadData.services');

const loadData = async (req, res) => {
  try {
    const result = await services.loadData();
    res.json({ message: result }).status(200);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message }).status(500);
  }
};
module.exports = {
  loadData,
};
