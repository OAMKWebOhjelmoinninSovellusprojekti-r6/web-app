const express = require('express');
const router = express.Router();
const historyItem = require('../model/orderHistoryItem');
const auth = require('../middleware/auth.js');

router.post('/', auth, async(req, res) => {
    // POST method router
    let data = await historyItem.create(req.body);
    try {
        if(data.affectedRows === 1) {
            console.log(data.affectedRows);
            res.sendStatus(200);
        } else if(data.affectedRows === 0) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    } catch (err) {
        res.send("ID does not match");
    };
});

  module.exports = router;