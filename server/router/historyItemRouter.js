const express = require('express');
const router = express.Router();
const historyItem = require('../model/orderHistoryItem');

router.post('/', async(req, res) => {
  
    let data = await historyItem.create(req.body);
    res.send(data);
  });

  module.exports = router;