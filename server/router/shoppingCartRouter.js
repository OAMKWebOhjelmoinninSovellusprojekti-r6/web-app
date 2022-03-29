const express = require('express');
const router = express.Router();
const shoppingCartModel = require('../model/shoppingCart');

// GET method router
router.get('/:shoppingCartId', async (req, res) => {
    console.log(req.params.shoppingCartId);
    let data = await shoppingCartModel.get(req.params.shoppingCartId);
    try {
        if(data.shoppingCartInfo != null) {
            console.log(data);
            res.send(data);
        } else if (data.shoppingCartInfo === null) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    } catch (err) {
        res.send("ID does not match");
    };
});

// POST method router
router.post('/', async (req, res) => {
    console.log(req.body);
    let data = await shoppingCartModel.create(req.body);
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
// PUT method router
router.put('/:shoppingCartItemId', async (req, res) => {
    console.log(req.params.shoppingCartItemId);
    let data = await shoppingCartModel.modify(req.params.shoppingCartItemId, req.body);
    try {
        if(data.affectedRows === 1) {
            console.log(data.affectedRows);
            res.sendStatus(200);
        } else if (data.affectedRows === 0) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    } catch (err) {
        res.send("ID does not match");
    }
});
// DELETE method router
router.delete('/:cartItemId', async (req, res) => {
    console.log(req.params.cartItemId);
    let data = await shoppingCartModel.delete(req.params.cartItemId);
    try {
        if(data.affectedRows === 1) {
            console.log(data.affectedRows);
            res.sendStatus(200);
        } else if (data.affectedRows === 0) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    } catch (err) {
        res.send("ID does not match");
    }
});

module.exports = router;
