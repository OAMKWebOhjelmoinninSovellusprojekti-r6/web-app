const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const parser = require('../utils/requestParser.js');
const restaurantModel = require('../model/restaurant');
const DBUtils = require('../utils/dbUtils.js');
const restaurant = require('../model/restaurant');

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

// POST method route
router.post('/', async (req, res) => {
    //!!!!!!!!!!!!!!!!!!!!!!!
    const userId = req.body.userId; // TEMPORARY, GET FROM JWT WHEN IMPLEMENTED
    //!!!!!!!!!!!!!!!!!!!!!!!
    let mData = {};
    mData.name = parser.parseString(req.body.name, 20);
    mData.address = parser.parseString(req.body.address, 20);
    mData.openingHours = parser.parseString(req.body.openingHours, 20);
    mData.restaurantType = parser.parseRestaurantType(req.body.restaurantType);
    mData.priceLevel = parser.parsePriceLevel(req.body.priceLevel);
    if(
        mData.name != null
        && mData.address != null
        && mData.openingHours != null
        && mData.restaurantType != null
        && mData.priceLevel != null
    ) {
        const data = await restaurantModel.create(
            userId,
            mData
        )
        if(
            data.success == true
            && data.errorCode == 0
            && data.restaurantId != null
        ) {
            res.status(200).send({
                'restaurantId': data.restaurantId
            });
        } else {
            res.status(500).send({
                'message': 'Unknown error'
            });
        }
    } else {
        res.status(400).send({
            'message': 'Invalid parameters'
        });
    }
});

// PUT method route
router.put('/:restaurantId', async (req, res) => {
    //!!!!!!!!!!!!!!!!!!!!!!!
    const userId = req.body.userId; // TEMPORARY, GET FROM JWT WHEN IMPLEMENTED
    //!!!!!!!!!!!!!!!!!!!!!!!
    /** Example JSON data request, modify method does not need all the values neccessarily
        {
            name: 'the Mesta',
            address: 'alley 7',
            opening_hours: '9.00-23.00',
            image_path: 'https://imagelocation.jpg',
            restaurant_type: 3,
            price_level: 2,
            user_iduser: 2
        }
    */   
    let restaurantId = req.params.restaurantId;
    let mData = {};
    mData.name = parser.parseString(req.body.name, 20);
    mData.address = parser.parseString(req.body.name, 20);
    mData.openingHours = parser.parseString(req.body.openingHours, 20);
    mData.restaurantType = parser.parseString(req.body.restaurantType, 20);
    mData.priceLevel = parser.parseString(req.body.name, 20);
    const uQuery = await restaurantModel.modify(
        userId,
        restaurantId,
        mData
    )
    if(
        uQuery.success == true
        && uQuery.errorCode == 0    
    ) {
        // If query was succesful send the received data, otherwise send the provided status code
        return res.status(200).send({
            'message': 'Restaurant updated succesfully'
        });
    } else {
        return res.status(500).send({
            'message': 'Uknown error'
        });
    }
});

// DELETE method route
router.delete('/:restaurantId', async (req, res) => {
    //!!!!!!!!!!!!!!!!!!!!!!!
    const userId = req.body.userId; // TEMPORARY, GET FROM JWT WHEN IMPLEMENTED
    //!!!!!!!!!!!!!!!!!!!!!!!
    // If not correct value type, send bad request response
    if(req.params.restaurantId === undefined || isNaN(req.params.restaurantId)) {
        res.status(400).send({
            'message': 'Invalid request parameters'
        });
    }
    const restaurantId = req.params.restaurantId;
    const data = await restaurantModel.delete(userId, restaurantId);
    if(
        data.success == true
        && data.errorCode == 0    
    ) {
        res.status(200).send({
            'message': 'Restaurant deleted succesfully'
        });
    } else {
        if(data.errorCode == 1){
            res.status(400).send({
                'message': 'Failed to delete restaurant'
            });
        } else {
            res.status(500).send({
                'message': 'Unknown error'
            });
        }
    }
});


module.exports = router;