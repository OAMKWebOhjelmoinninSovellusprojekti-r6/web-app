import React from 'react'
import './RestaurantListView.css'
import Restaurant from './Restaurant'
import RestaurantSearch from './RestaurantSearch'
import { useState, useEffect }  from 'react';
import UserService from '../../services/user.service';
import AuthService from "../../services/auth.service";
import { useAuthState } from '../../context/context.js';


export default function RestaurantListView() {

  const currentUser = useAuthState();
  let currentUserId = AuthService.getCurrentUserId();
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  

  //get restaurants data
  useEffect(() => {
    updateRestaurants();
  },[]);

  useEffect(() => {
    updateRestaurants();
  }, [currentUser])

  const updateRestaurants = () => {
    if(currentUser && currentUser.isOwner == 1){
      UserService.restaurantGetByOwnerId(currentUserId).then(result => {
        setRestaurants(result.data);
      });
    } else {
      UserService.restaurantGetAll().then(result => {
        setRestaurants(result.data.data);
      });
    }
  }

    function parseRestaurantType(value){
    let restaurantType = '-';
    if(value == 1){
      restaurantType = 'buffet';
    } else if (value == 2){
      restaurantType = 'fast food';
    } else if (value == 3){
      restaurantType = 'fast casual';
    } else if (value == 4){
      restaurantType = 'casual dining';
    } else if (value == 5){
      restaurantType = 'fine dining';
    }
    return restaurantType;
  }

  //for searching restaurants
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h1>Search restaurants</h1>
      <RestaurantSearch searchValue = {searchTerm} onSearchChange = {handleSearchChange}/>
      <h1>Browse restaurants</h1>
      <div className="restaurants-container">
        {restaurants.filter(restaurant => 
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
          || parseRestaurantType(restaurant.restaurant_type).includes(searchTerm.toLowerCase())).map(r => 
            <Restaurant
              key={r.id}
              id={r.id}
              image={r.image_path}
              name={r.name}
              address={r.address}
              openingHours={r.opening_hours}
              type={r.restaurant_type}
              priceLevel={r.price_level}
            />
          )
        }
      </div>
    </div>
  )
}
  