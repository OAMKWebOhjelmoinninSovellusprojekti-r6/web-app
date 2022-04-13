import React from 'react'
import './RestaurantListView.css'
import Restaurant from './Restaurant'
import RestaurantSearch from './RestaurantSearch'
import { useState, useEffect }  from 'react';
import {  Link, Outlet } from 'react-router-dom';
import UserService from '../../services/user.service';
import AuthService from "../../services/auth.service";

export default function RestaurantListView() {
  
  let currentUser = AuthService.getCurrentUser();
  let currentUserId = AuthService.getCurrentUserId();
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  

  //get restaurants data
  useEffect(() => {
    UserService.restaurantGetAll().then(result => {
      setRestaurants(result.data.data);
    });
  },[]);
  
  console.log(currentUserId);
  console.log(restaurants.user_iduser);

  //for searching restaurants
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

if (currentUser === null|| currentUser.isOwner === 0) {
  return (
    <div>
      <RestaurantSearch searchValue = {searchTerm} onSearchChange ={handleSearchChange}/>
          <div className="restaurantContainer" >
              {restaurants.filter(restaurant =>restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                restaurant.price_level.toString().includes(searchTerm.toLowerCase())).map(r => 
                  <Link to={`/restaurants/${r.id}`} key={r.id}>
                <Restaurant image={r.image_path} name={r.name} address={r.address} openingHours={r.opening_hours} 
                 type={r.restaurant_type} priceLevel={r.price_level}/>
                 </Link>
              )}
            <Outlet />
        </div>
        
    </div>
  )
    }
else {
  return (
    <div>
        <div className="restaurantContainer" >
            {restaurants.filter(restaurant =>restaurant.user_iduser.toString().includes(currentUserId.toString())).map(r => 
                <Link to={`/restaurants/${r.id}`} key={r.id}>
                  <Restaurant image={r.image_path} name={r.name} address={r.address} openingHours={r.opening_hours} 
                   type={r.restaurant_type} priceLevel={r.price_level}/>
                </Link>
            )}
            <Outlet />
        </div>
          
     </div>
    )
  }
}
  