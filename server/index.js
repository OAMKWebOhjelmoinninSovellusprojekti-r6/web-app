require('dotenv').config();
const port = process.env.port || 3001;
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const upload = require('express-fileupload');

// Import routers
const restaurantRouter = require('./router/restaurantRouter')
const userRouter = require('./router/userRouter.js');
const shoppingCartRouter = require('./router/shoppingCartRouter')
const historyRouter = require('./router/historyRouter');
const itemRouter = require('./router/itemRouter');
const authRouter  = require('./router/authRouter.js');
const itemHistory = require('./router/historyItemRouter');

const whitelist = ["http://localhost:3001", "http://localhost:3000", "http://foodmaster.live"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions));


// File uploads, static files folder
app.use("/static", express.static("static"));
app.use(upload());

// Request parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routers
app.use('/auth', authRouter);
app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);
app.use('/cart', shoppingCartRouter);
app.use('/history', historyRouter);
app.use('/item', itemRouter);
app.use('/historyItem', itemHistory);

app.get('/', (req, res) => {
  res.send('FoodMachine!');
});
app.listen(port || 3001, () => {
  console.log(`Example app listening on port ${port}!`)
});
module.exports = app;