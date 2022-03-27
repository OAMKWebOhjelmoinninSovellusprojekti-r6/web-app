const express = require('express');
const router = express.Router();
const item = require('../model/item');

//Get item info by item number
router.get('/:itemId', async function(req, res){
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
    //Array for data which is transmitted to new item
    let requestData = {}
    requestData.name = req.body.name;
    requestData.description = req.body.description;
    requestData.price = req.body.price;
    requestData.image_path = req.body.image_path;
    requestData.category = req.body.category;
    requestData.restaurant_id = req.body.restaurant_id;
    if(requestData.name && requestData.description && requestData.price && requestData.image_path && requestData.category && requestData.restaurant_id){
        createData = await item.create(requestData);
        //If query is succesful, create new item. Otherwise send apppropriate error code.
        if(createData.status == 200){
            res.status(200).send({
                'Created new item with id:': createData.itemId
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
    //Array for data which is updated. Some or all of the values are changeable.
    updateData.name = req.body.name;
    updateData.description = req.body.description;
    updateData.price = req.body.price;
    updateData.image_path = req.body.image_path;
    updateData.category = req.body.category;
    updateData.restaurant_id = req.body.restaurant_id;
    if(updateData.name || updateData.description || updateData.price || updateData.image_path || updateData.category || updateData.restaurant_id){
        changeData = await item.modify(req.params.itemId, updateData);
        //If query is succesful, update data. Otherwise send appropriate error code.
        if(changeData.status == 200){
            res.status(200).send({
                'message': 'Data updated.'
            });
        } else {
            res.status(changeData.status);
        }
    } else {
        res.status(400);
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
    
module.exports = router;