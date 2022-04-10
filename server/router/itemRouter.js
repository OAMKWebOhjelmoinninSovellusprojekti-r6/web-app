const express = require('express');
const router = express.Router();
const item = require('../model/item');
const parser = require('../utils/requestParser.js');
const FileService = require('../services/fileService.js');
const auth = require('../middleware/auth.js');

//Get item info by restaurant id
router.get('/:restaurantId', async function(req, res){
    let idRestaurant = parseInt(req.params.restaurantId);
    let data = await item.get(idRestaurant);
    if(data.status === 500 || data.status === 400) {
        res.send(data.status);
    } else {
        res.send(data);
    }  
    });

// Create item
router.post('/', auth, async function(req, res){
    console.log('POST, /item');
    // Initialize FileService if file is sent with request
    let fs = null;
    if(req.files && req.files.image){
        fs = new FileService(
            req.files.image,
            'item'
        );
    }
    //Object for data which is transmitted to new item
    let requestData = {};
    requestData.name = parser.parseString(req.body.name, 20);
    requestData.description = parser.parseString(req.body.description, 20);
    requestData.price = parser.parsePrice(req.body.price);
    requestData.category = parser.parseString(req.body.category, 20);
    requestData.restaurantId = parser.parseId(req.body.restaurantId);
    if(
        requestData.name != null
        && requestData.description != null
        && requestData.price != null
        && requestData.category != null
        && requestData.restaurantId != null
        && fs != null
    ){
        const createData = await item.create(
            req.tokenData.userData.userId,
            requestData
        );
        console.log(createData);
        if(
            createData.success == true
            && createData.errorCode == 0
            && createData.itemId != null
        ) {
            // Save uploaded file to static folder
            fs.setFileName(createData.itemId.toString());
            const saveResult = fs.saveFileToStatic();
            console.log(saveResult);
            if(
                saveResult.errorCode == 0
                && saveResult.imagePath != null
            ) {
                const updateResult = await item.updateImageUrl(saveResult.imagePath, createData.itemId);
                if(updateResult.success == true && updateResult.errorCode == 0){
                    return res.status(200).send({
                        'itemId': createData.itemId
                    });
                }
            }
        }
        return res.status(500).send({
            'message': 'Unknown error'
        });
    } else {
        return res.status(400).send({
            'message': 'Invalid parameters'
        });
    }
});

// Change item
router.put('/:itemId', auth, async function(req, res){
    console.log('PUT, /item');
    let fs = null;
    if(req.files && req.files.image){
        fs = new FileService(
            req.files.image,
            'item'
        )
    }
    //Object for data which is updated. Some or all of the values are changeable.
    let updateData = {}
    updateData.name = parser.parseString(req.body.name, 20);
    updateData.description = parser.parseString(req.body.description);
    updateData.price = parser.parsePrice(req.body.price);
    updateData.category = parser.parseString(req.body.category);
    updateData.restaurantId = parser.parseId(req.body.restaurantId);
    if(
        (
            updateData.name != null
            || updateData.description != null
            || updateData.price != null
            || updateData.category != null
            || fs != null
        )
        && req.params.restaurantId
        && req.params.itemId
    ){
        changeData = await item.modify(
            req.tokenData.userData.userId,
            req.params.itemId,
            updateData
        );
        //If query is succesful, update data. Otherwise send appropriate error code.
        if(fs != null){
            fs.setFileName(req.params.itemId.toString());
            const saveResult = fs.saveFileToStatic();
            if(
                saveResult.errorCode == 0
                && saveResult.imagePath != null
            ) {
                const updateResult = await item.updateImageUrl(saveResult.imagePath, req.params.itemId);
                if(updateResult.success == true && updateResult.errorCode == 0){
                    return res.status(200).send({
                        'message': 'Item updated succesfully'
                    });
                }
            }
        } else {
            return res.status(200).send({
                'message': 'Item updated succesfully'
            });
        }
    } else {
        return res.status(400).send({
            'message': 'Invalid parameters'
        });
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