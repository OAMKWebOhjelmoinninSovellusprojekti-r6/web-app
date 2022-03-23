const express = require('express');
const router = express.Router();
const restaurantModel = require('../model/restaurant');

restaurantData = {
    name: "burgerjoint",
    address: "alley 7",
    opening_hours: "9.00-23.00",
    image_path: "https://imagelocation.jpg",
    restaurant_type: 3,
    price_level: 2,
    user_iduser: 2
}

// GET method route
router.get('/:restaurantId?', (req, res) => {
    // Function to send the request to the restaurant GET model executed when called
    const getRestaurants = async () => {
        const data = await restaurantModel.get(req.params.restaurantId);
        console.log("response", data);
        return data;
    };
    console.log(typeof req.params.restaurantId);
    try {
        // Transform the value to Integer
        req.params.restaurantId = parseInt(req.params.restaurantId);
        console.log(typeof req.params.restaurantId, req.params.restaurantId);
        // If not correct value type throw to the error clause
        if(req.params.restaurantId === undefined || isNaN(req.params.restaurantId)) {
            throw new Error();
        }
        //Calls the getRestaurant function, r represents the responsedata from the database
        getRestaurants().then(r => {
            // If query was succesful send the received data, otherwise send the provided status code
            if (r.status === 200) {
                res.send(r);
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
    // Function to send the request to the restaurant POST model executed when called
    const addRestaurant = async () => {
        const data = await restaurantModel.create(req.body);
        console.log("created", data);
        return data;
    };
    console.log(typeof req.body.restaurant_type);
    try {
        console.log(typeof req.body.user_iduser, req.body.user_iduser);
        if(typeof req.body.name != 'string' 
            || typeof req.body.address != 'string' 
            || typeof req.body.opening_hours != 'string' 
            || typeof req.body.image_path != 'string'
            || typeof req.body.restaurant_type != 'number'
            || typeof req.body.price_level != 'number'
            || typeof req.body.user_iduser != 'number'
           ) {
            throw new Error();
        };
        addRestaurant().then(r => {
            if (r.status === 200) {
                console.log(r);
                res.sendStatus(r.status);
            } else {
                res.sendStatus(r.status)
            }
        });
    } catch (err) {
        console.log("errorhandler executed");
        res.send("Incorrect value types")
    }
});

// PUT method route
router.put('/:restaurantId', (req, res) => {

    const modifyRestaurant = async () => {
        let data = await restaurantModel.modify(req.params.restaurantId, req.body);
        console.log("Modified", data);
    }
    modifyRestaurant();
    res.send("modified");
});

// DELETE method route
router.delete('/:restaurantId', (req, res) => {

    const delData = async () => {
        let data = await restaurantModel.delete(req.params.restaurantId);
        console.log("deleted", data);
    }
    delData();
    res.send("deleted");
});


module.exports = router;