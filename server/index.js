require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const restaurantRouter = require('./router/restaurantRouter')

app.use(bodyParser.json());
app.use('/restaurant', restaurantRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

module.exports = app
