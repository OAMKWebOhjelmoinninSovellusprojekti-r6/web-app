const express = require('express');
const router = express.Router();
const restaurantModel = require('../model/restaurant');

// GET method route
router.get('/:restaurantId?', (req, res) => {

    console.log(typeof req.params.restaurantId);
    try {
        // Transform the value to Integer
        req.params.restaurantId = parseInt(req.params.restaurantId);
        console.log(typeof req.params.restaurantId, req.params.restaurantId);
        // If not correct value type throw to the error clause
        if(req.params.restaurantId === undefined || isNaN(req.params.restaurantId)) {
            throw new Error();
        }
        // Send request data
        const data = restaurantModel.get(req.params.restaurantId);
        data.then(r => {
            if (r.status === 200) {
                res.send(r);
                console.log(r)
            } else {
                res.sendStatus(r.status);
            }
        });
    } catch (err) {
        // GET method only uses ID for parameter so if not provided send error message
        console.log("errorhandler executed");
        res.send("No ID defined");
    }
    
    
});

// POST method route
router.post('/', (req, res) => {
  
/** Example JSON data request
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
    console.log(typeof req.body.restaurant_type);
    try {
        // Check for correct type values, if incorrect throw to error handler
        console.log(typeof req.body.user_iduser, req.body.user_iduser);
        if(typeof req.body.name != 'string' 
            || typeof req.body.address != 'string' 
            || typeof req.body.opening_hours != 'string' 
            || typeof req.body.image_path != 'string'
            || typeof req.body.restaurant_type != 'number'
            || typeof req.body.price_level != 'number'
            || typeof req.body.user_iduser != 'number') 
        {
            throw new Error();
        };
        // Send request data
        const data = restaurantModel.create(req.body);
        data.then(r => {
            // If query was succesful send the received data, otherwise send the provided status code
            if (r.status === 200) {
                console.log(r);
                res.sendStatus(r.status);
            } else {
                res.sendStatus(r.status)
            }
        });
    } catch (err) {
        // Error response for incorrect valuetypes
        console.log("errorhandler executed");
        res.send("Incorrect value types")
    }
});

// PUT method route
router.put('/:restaurantId', (req, res) => {

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
    console.log("typeof", typeof req.body.address);
    try {
        // Check for correct type values, if incorrect throw to error handler
        if((typeof req.body.name !== 'string' && req.body.name != undefined)
            ||(typeof req.body.address != 'string' && req.body.address != undefined)
            ||(typeof req.body.opening_hours != 'string' && req.body.opening_hours != undefined)
            ||(typeof req.body.image_path != 'string' && req.body.image_path != undefined)
            ||(typeof req.body.restaurant_type != 'number' && req.body.restaurant_type != undefined)
            ||(typeof req.body.price_level != 'number' && req.body.price_level != undefined)
            ||(typeof req.body.user_iduser != 'number' && req.body.user_iduser != undefined)

        ) {
            throw new Error();
        }
        // Send request data
        const data = restaurantModel.modify(req.params.restaurantId, req.body);
        data.then(r => {
            // If query was succesful send the received data, otherwise send the provided status code
            if (r.status === 200) {
                console.log(r);
                res.sendStatus(r.status);
            } else {
                res.sendStatus(r.status)
            }
        });
    } catch (err) {
        // Error response for incorrect valuetypes
        console.log("errorhandler executed");
        res.send("Incorrect value types")
    }
});

// DELETE method route
router.delete('/:restaurantId?', (req, res) => {

    console.log(typeof req.params.restaurantId);
    try {
        // Transform the value to Integer
        req.params.restaurantId = parseInt(req.params.restaurantId);
        console.log(typeof req.params.restaurantId, req.params.restaurantId);
        // If not correct value type throw to the error clause
        if(req.params.restaurantId === undefined || isNaN(req.params.restaurantId)) {
            throw new Error();
        }
        // Send the request data
        const data = restaurantModel.delete(req.params.restaurantId);
        data.then(r => {
            // If query was succesful send the received data, otherwise send the provided status code
            if (r.status === 200) {
                res.sendStatus(r.status);
            } else {
                res.sendStatus(r.status);
            }
        });
    } catch (err) {
        // DELETE method only uses ID for parameter so if not provided send error message
        console.log("errorhandler executed");
        res.send("No ID defined");
    }
});


module.exports = router;