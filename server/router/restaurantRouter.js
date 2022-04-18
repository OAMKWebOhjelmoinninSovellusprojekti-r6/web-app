const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const parser = require('../utils/requestParser.js');
const restaurantModel = require('../model/restaurant');
const FileService = require('../services/fileService.js');

// GET method route
router.get('/', async (req, res) => {
    const restaurantData = await restaurantModel.getAll();
    if(
        restaurantData.success == true
        && restaurantData.errorCode == 0
    ) {
        if(restaurantData.restaurants.length > 0){
            res.status(200).send({
                'data': restaurantData.restaurants
            });
        } else {
            res.status(404).send({
                'message': 'No restaurants found'
            });
        }
    } else {
        res.status(500).send({
            'message': 'Unknown error'
        });
    }
});

router.get('/:restaurantId', async (req, res) => {
    // If not correct value type, return bad request
    console.log(req.params.restaurantId);
    if(
        req.params.restaurantId === undefined
        || isNaN(req.params.restaurantId)
    ) {
        return res.status(400).send({
            'message': 'Invalid restaurant id'
        });
    }
    const restaurantData = await restaurantModel.getById(req.params.restaurantId);
    if(
        restaurantData.success == true
        && restaurantData.errorCode == 0
    ) {
        if(restaurantData.restaurants.length == 1){
            return res.status(200).send(restaurantData.restaurants);
        } else {
            return res.status(404).send({
                'message': 'Restaurant not found'
            });
        }
    } else {
        return res.status(500).send({
            'message': 'Unknown error'
        });
    }
});

router.get('/owner/:userId', async (req, res) => {
    console.log("jee", req.params.userId)
    let ownerId = parser.parsePathInteger(req.params.userId);
    if(ownerId != null){
        let data = await restaurantModel.getByOwnerId(ownerId);
        if(
            data.success == true
            && data.errorCode == 0
        ) {
            return res.status(200).send(
                data.restaurants
            )
        }
    } else {
        return res.status(400).send({
            'message': 'Invalid user id'
        });
    }
    return res.status(500).send({
        'message': 'Unknown error'
    });
});

// POST method route for /restaurant, create new restaurant
router.post('/', auth, async (req, res) => {
    console.log("POST, /restaurant");
    // Init FileService with multipart file
    let fs = null;
    if(req.files.image){
        try {
            fs = new FileService(
                req.files.image,
                'restaurant'
            );
        } catch (err) {
            console.log(err);
        }
    }
    // Create Object with required POST data
    let mData = {};
    mData.name = parser.parseString(req.body.name, 50);
    mData.address = parser.parseString(req.body.address, 50);
    mData.openingHours = parser.parseString(req.body.openingHours, 20);
    mData.restaurantType = parser.parseRestaurantType(req.body.restaurantType);
    mData.priceLevel = parser.parsePriceLevel(req.body.priceLevel);
    // Verify that all required values exists and are valid
    console.log(mData);
    if(
        mData.name != null
        && mData.address != null
        && mData.openingHours != null
        && mData.restaurantType != null
        && mData.priceLevel != null
        && fs != null
    ) {
        // Insert new restaurant in database
        const data = await restaurantModel.create(
            req.tokenData.userData.userId,
            mData
        )
        if(
            data.success == true
            && data.errorCode == 0
            && data.restaurantId != null
        ) {
            // Save uploaded file (restaurant image) to static folder
            fs.setFileName(data.restaurantId.toString());
            const saveResult = fs.saveFileToStatic();
            if(
                saveResult.errorCode == 0
                && saveResult.imagePath != null
            ) {
                // Update saved image path to database
                const updateResult = await restaurantModel.updateImageUrl(
                    saveResult.imagePath,
                    data.restaurantId
                );
                if(updateResult.success == true && updateResult.errorCode == 0){
                    console.log("POST, /restaurant, 200");
                    return res.status(200).send({
                        'restaurantId': data.restaurantId
                    });
                }
            }
        }
        console.log("POST, /restaurant, 500");
        return res.status(500).send({
            'message': 'Unknown error'
        });
    } else {
        console.log("POST, /restaurant, 400");
        return res.status(400).send({
            'message': 'Invalid parameters'
        });
    }
});

// PUT method route
router.put('/:restaurantId', auth, async (req, res) => {

    let fs = null;
    let mData = {};
    let restaurantId = req.params.restaurantId;
    
    // If file is sent with multipart request
    if(req.files && req.files.file){
        // Init FileService with multipart file
        fs = new FileService(
            req.files.file,
            'restaurant'
        );
    }
    
    mData.name = parser.parseString(req.body.name, 20);
    mData.address = parser.parseString(req.body.address, 20);
    mData.openingHours = parser.parseString(req.body.openingHours, 20);
    mData.restaurantType = parser.parseString(req.body.restaurantType, 20);
    mData.priceLevel = parser.parseString(req.body.priceLevel, 20);
    const uQuery = await restaurantModel.modify(
        req.tokenData.userData.userId,
        restaurantId,
        mData
    )
    if(
        uQuery.success == true
        && uQuery.errorCode == 0    
    ) {
        // If file was sent with request
        if(fs != null){
            fs.setFileName(restaurantId.toString());
            const saveResult = fs.saveFileToStatic();
            if(
                saveResult.errorCode == 0
                && saveResult.imagePath != null
            ) {
                const updateResult = await restaurantModel.updateImageUrl(saveResult.imagePath, restaurantId);
                if(updateResult.success == true && updateResult.errorCode == 0){
                    return res.status(200).send({
                        'message': 'Restaurant updated succesfully'
                    });
                }
            }
        } else {
            // If query was succesful send the received data, otherwise send the provided status code
            return res.status(200).send({
                'message': 'Restaurant updated succesfully'
            });
        }
    }
    return res.status(500).send({
        'message': 'Uknown error'
    });
});

// DELETE method route
router.delete('/:restaurantId', auth, async (req, res) => {
    // If not correct value type, send bad request response
    if(req.params.restaurantId === undefined || isNaN(req.params.restaurantId)) {
        res.status(400).send({
            'message': 'Invalid request parameters'
        });
    }
    const restaurantId = req.params.restaurantId;
    const data = await restaurantModel.delete(
        req.tokenData.userData.userId,
        restaurantId
    );
    if(
        data.success == true
        && data.errorCode == 0    
    ) {
        return res.status(200).send({
            'message': 'Restaurant deleted succesfully'
        });
    } else {
        if(data.errorCode == 1){
            return res.status(400).send({
                'message': 'Failed to delete restaurant'
            });
        } 
    }
    return res.status(500).send({
        'message': 'Unknown error'
    });
});


module.exports = router;
