const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const { userTweetRouter, loadDatatRouter } = require('./routes/userTweet.route');

env.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use('/data', loadDatatRouter);
app.use('/users', userTweetRouter);

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
