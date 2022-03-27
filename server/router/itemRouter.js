const express = require('express');
const router = express.Router();
const item = require('../model/item');

//Get item
router.get('/:itemId', async function(req, res){
    console.log('terve');
    let idItem = parseInt(req.params.itemId);
    let data = await item.get(idItem);
    if(data.status === 500 || data.status === 400) {
        res.send(data.status);
    } else {
        res.send(data);
    }  
    });

// Create item
router.post('/', async function(req, res){
    console.log('POST, /item');
    let requestData = {}
    requestData.name = req.body.name;
    requestData.description = req.body.description;
    requestData.price = req.body.price;
    requestData.image_path = req.body.image_path;
    requestData.category = req.body.category;
    requestData.restaurant_id = req.body.restaurant_id;
    if(requestData.name && requestData.description && requestData.price && requestData.image_path && requestData.category && requestData.restaurant_id){
        createData = await item.create(requestData);
        if(createData.status == 200){
            res.status(200).send({
                'idItem': createData.itemId
            });
        } else {
            res.status(createData.status);
        }
    } else {
        res.status(400);
    }
});

// Change item
router.put('/:itemId', async function(req, res){
    console.log('PUT, /item');
    let updateData = {}
    updateData.name = req.body.name;
    updateData.description = req.body.description;
    updateData.price = req.body.price;
    updateData.image_path = req.body.image_path;
    updateData.category = req.body.category;
    updateData.restaurant_id = req.body.restaurant_id;
    if(updateData.name || updateData.description || updateData.price || updateData.image_path || updateData.category || updateData.restaurant_id){
        changeData = await item.modify(updateData);
        if(changeData.status == 200){
            res.sendStatus(200);
        } else {
            res.sendStatus(changeData.status);
        }
    } else {
        res.sendStatus(400);
    }
});

// Delete item
router.delete('/:itemId', async function(req, res){
    console.log('DELETE, /item');
    let idItem = parseInt(req.params.itemId);
    let data = await item.delete(idItem);
    if(data.status === 500 || data.status === 400) {
        res.send(data.status);
    } else {
        res.send(data);
    }  
    });
    /*const itemId = req.body.itemId;
    if(itemId){
        data = await item.delete(itemId);
        if(data.status == 200){
            res.sendStatus(200);
        } else {
            res.sendStatus(data.status);
        }
    } else {
        res.sendStatus(400);
    }
});*/

module.exports = router;