require('dotenv').config(".env");
const port = process.env.port;
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');


const restaurantRouter = require('./router/restaurantRouter')
const userRouter = require('./router/userRouter.js');
const shoppingCartRouter = require('./router/shoppingCartRouter')
const historyRouter = require('./router/history');
const itemRouter = require('./router/itemRouter');

app.use(cors());
app.use(bodyParser.json());
app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);
app.use('/cart', shoppingCartRouter);
app.use('/history', historyRouter);
app.use('/item', itemRouter);

app.get('/', (req, res) => {
  res.send('FoodMachine!');
});
app.listen(port || 3001, () => {
  console.log(`Example app listening on port ${port}!`)
});
module.exports = app;