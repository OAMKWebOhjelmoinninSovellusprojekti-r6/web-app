const express = require('express');
const router = express.Router();
const item = require('../model/item');
const parser = require('../utils/requestParser.js');
const FileService = require('../services/fileService.js');
const auth = require('../middleware/auth.js');

//Get item info by restaurant id
router.get('/:restaurantId', async function(req, res){
    console.log('GET, /item/:{restaurantId}');
    if(req.params.restaurantId){
        let data = await item.get(req.params.restaurantId);
        if(
            data.success == true
            && data.errorCode == 0
        ) {
            return res.status(200).send({
                'itemInfo': data.itemInfo
            });
        } else {
            return res.status(400).send({
                'message': 'Invalid restaurant id'
            });
        }
    } else {
        return res.status(500).send({
            'message': 'Unknown error'
        });
    }
});

// Create item
router.post('/', auth, async (req, res) => {
    console.log('POST, /item');
    // Initialize FileService if file is sent with request
    let fs = null;
    if(req.files.imagePath){
        fs = new FileService(
            req.files.imagePath,
            'item'
        );
    }
    //Object for data which is transmitted to new item
    let requestData = {};
    requestData.name = parser.parseString(req.body.name, 50);
    requestData.description = parser.parseString(req.body.description, 50);
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
        const data = await item.create(
            req.tokenData.userData.userId,
            requestData
        );
        console.log(data);
        if(
            data.success == true
            && data.errorCode == 0
            && data.itemId != null
        ) {
            // Save uploaded file to static folder
            fs.setFileName(data.itemId.toString());
            const saveResult = fs.saveFileToStatic();
            console.log(saveResult);
            if(
                saveResult.errorCode == 0
                && saveResult.imagePath != null
            ) {
                const updateResult = await item.updateImageUrl(saveResult.imagePath, data.itemId);
                if(updateResult.success == true && updateResult.errorCode == 0){
                    return res.status(200).send({
                        'itemId': data.itemId
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
    console.log(req.body);
    let itemId = parser.parsePathInteger(req.params.itemId);
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
    updateData.description = parser.parseString(req.body.description, 50);
    updateData.price = parser.parsePrice(req.body.price);
    updateData.category = parser.parseString(req.body.category, 20);
    updateData.restaurantId = parser.parseId(req.body.restaurantId);
    
    if(
        (
            updateData.name != null
            || updateData.description != null
            || updateData.price != null
            || updateData.category != null
            || fs != null
        )
        && updateData.restaurantId != null
        && itemId != null
    ){
        changeData = await item.modify(
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
router.delete('/:itemId', auth, async function(req, res){
    console.log('DELETE, /item');
    let itemId = parser.parsePathInteger(req.params.itemId);
    
    if(itemId != null){
        let data = await item.delete(itemId);
        if(
            data.success == true
            && data.errorCode == 0
        ) {
            return res.status(200).send({
                'message': 'Item deleted succesfully'
            });
        }
    } else {
        return res.status(400).send({
            'message': 'Invalid parameters'
        });
    }
    return res.status(500).send({
        'message': 'Unknown error'
    });
});
    
module.exports = router;