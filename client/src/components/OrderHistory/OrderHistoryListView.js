import React from 'react'
import './OrderHistoryListView.css'
import axios from 'axios'
import { useState, useEffect }  from 'react';
import {  Link, Outlet } from 'react-router-dom';
import OrderHistoryItem from './OrderHistoryItem';
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import Restaurant from "../Restaurant/Restaurant"


export default function OrderHistoryListView() {
  
  const [orderedItems, setOrderedItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  let currentUser = AuthService.getCurrentUser();
  let currentUserId = AuthService.getCurrentUserId();
  console.log(currentUser);
  console.log(currentUserId);
  
  
   {
  //get orderhistory data from user and restaurants from owner
  useEffect(() => {
   const getData = async () => {
     if(currentUser.isOwner === 0){
    const results = await UserService.userOrderHistoryGet(); 
     //console.log(results.data.orderHistoryInfo);
         setOrderedItems(results.data.orderHistoryInfo);
        }
         else {
          const info = await UserService.restaurantGetAll();
          setRestaurants(info.data.data);
         }
       
     }
   getData();
   
},[]); 
console.log(orderedItems);
console.log(restaurants);
  } 
 
let output = <h3>Orders:</h3>;
if (!orderedItems.length){
  output = <h3>You haven't yet ordered</h3>;
}
let ownerOutput = <h3>Click a restaurant to show orders.</h3>
if(!restaurants.length){
ownerOutput =  <h3>You don't yet have restaurants!</h3>
}   
if(currentUser.isOwner === 0) {
  return (
<div className="historyContainer">
        
        <div className="orderHistoryContainer">
             { output }
                { 
                  orderedItems.map(o => 
                    <Link to={`/user/history/${o.idorder_history}`} key={o.idorder_history}>
                      <OrderHistoryItem id={ o.idorder_history } time={ o.timestamp } total={ o.total } />
                   </Link>
                )}
                
          </div>
          <Outlet />
          </div>
  )}
  else {
    return (
      <div>
        { ownerOutput }
      <div className="restaurantContainer" >
        
              {restaurants.filter(restaurant =>restaurant.user_iduser.toString().includes(currentUserId.toString())).map(r => 
                <Restaurant image={r.image_path} name={r.name} address={r.address} openingHours={r.opening_hours} 
                 type={r.restaurant_type} priceLevel={r.price_level} altLink={`/user/history/owner/${r.id}`} />
              )}
      </div>
      </div>
    )}
 }
  
                            
