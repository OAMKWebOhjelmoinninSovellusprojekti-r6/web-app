import React from 'react'
import './RestaurantListView.css'
import Restaurant from './Restaurant'
import RestaurantSearch from './RestaurantSearch'
import axios from 'axios'
import { useState, useEffect }  from 'react';
import {  Link, Outlet } from 'react-router-dom';

export default function RestaurantListView() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  //get restaurants data
  useEffect(() => {
   const getData = async () => {
     const results = await axios.get('http://www.localhost:3001/restaurant');
     //console.log(results.data.restaurantInfo);
         setRestaurants(results.data.data);
     }
   getData();
   
},[]); 
console.log(restaurants);
  
//for searching restaurants
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
}

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
