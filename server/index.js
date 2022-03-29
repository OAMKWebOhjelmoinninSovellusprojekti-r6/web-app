require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const restaurantRouter = require('./router/restaurantRouter')
const userRouter = require('./router/userRouter.js');

app.use(bodyParser.json());
app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

module.exports = app
