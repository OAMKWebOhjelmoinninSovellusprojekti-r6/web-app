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
    
    const getRestaurants = async () => {
        let data = await restaurantModel.get(req.params.restaurantId);
        console.log("response", data);
    };
    getRestaurants();
    res.send("OK");
    
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
    console.log(req.body);

    const addRestaurant = async () => {
        let data = await restaurantModel.create(req.body);
        console.log("created", data);
    };
    addRestaurant();
    res.send("accepted");
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