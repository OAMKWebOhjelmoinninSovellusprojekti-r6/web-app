const express = require('express');
const router = express.Router();
const shoppingCartModel = require('../model/shoppingCart');
const auth = require('../middleware/auth.js')
const parser = require('../utils/requestParser')

// GET method router
router.get('/:shoppingCartId', auth, async (req, res) => {
    
    if(req.params){
        let data = await shoppingCartModel.get(req.params.shoppingCartId);
        try {
            if(data.shoppingCartInfo != null) {
                console.log(data);
                res.send(data);
            } else if (data.shoppingCartInfo === null) {
                res.send(data);
            } else {
                res.sendStatus(500);
            }
        } catch (err) {
            res.send("ID does not match");
        };
    } else {
        return res.status(400).send({
            'message': 'Invalid parameters'
        })       
    }
});

// POST method router
router.post('/', auth, async (req, res) => {

    let requestData = {};
    requestData.itemId = parser.parseId(req.body.itemId);
    requestData.quantity = parser.parsePathInteger(req.body.quantity);
    requestData.idrestaurant = parser.parseId(req.body.idrestaurant);

    if(
        requestData.itemId != null
        && requestData.quantity != null
        && requestData.idrestaurant != null
    ) {
        let data = await shoppingCartModel.create(req.tokenData.userData.shoppingCartId, req.body);
        try {
            if(data.affectedRows === 1) {
                res.sendStatus(200);
            } else if(data.affectedRows === 0) {
                res.sendStatus(400);
            } else {
                res.sendStatus(500);
            }
        } catch (err) {
            res.send("ID does not match");
        };
    } else {
        return res.status(400).send({
            'message': 'Invalid parameters'
        })
    }
    
});
// PUT method router
router.put('/:shoppingCartItemId', auth, async (req, res) => {

    let requestData = {};
    requestData.itemId = parser.parseId(req.body.itemId);
    requestData.quantity = parser.parsePathInteger(req.body.quantity);
    requestData.idrestaurant = parser.parseId(req.body.idrestaurant);

    if(
        requestData.itemId != null
        || requestData.quantity != null
        || requestData.idrestaurant != null
    ) {
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
    } else {
        return res.status(400).send({
            'message': 'Invalid parameters'
        })       
    }
});
// DELETE method router
router.delete('/:cartItemId', auth, async (req, res) => {
    let cartItemId = parser.parseId(req.params.cartItemId)
    if(cartItemId != null) {
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
    } else {
        return res.status(400).send({
            'message': 'Invalid parameters'
        });
    }

});

module.exports = router;
