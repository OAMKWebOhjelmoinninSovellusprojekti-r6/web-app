require('dotenv').config(".env");
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const port = process.env.port;

const restaurantRouter = require('./router/restaurantRouter')
const historyRouter = require('./routes/history.js');

app.use(cors());
app.use(bodyParser.json());
app.use('/restaurant', restaurantRouter);
app.use('/history', historyRouter);

app.get('/', (req, res) => {
  res.send('FoodMachine!');
});
app.listen(port || 3000, () => {
  console.log(`Example app listening on port ${port}!`)
});
module.exports = app;