import React from 'react'
import { useParams } from 'react-router-dom'; 
import AuthService from "../../services/auth.service";
import SingleOrderHistoryItem from './SingleOrderHistoryItem'
import UserService from "../../services/user.service";
import { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';

export default function OwnerOrderHistory() {
    
    const {restaurantId}= useParams();
    const [orderedItem, setOrderedItem] = useState([]);
    

  //get orderhistory from restaurant owner
  useEffect(() => {
   const getData = async () => {
     const results = await UserService.ownerOrderHistoryGet(restaurantId);
     //console.log(results.data.orderInfo);
         setOrderedItem(results.data.orderInfo);
     }
   getData();
   
},[]); 
console.log(orderedItem);

return (
    <div  >
         <Link to="/history"><button>Back to your restaurants</button></Link>
         <h3>Orders:</h3>
          <div className="singleHistoryContainer">
           { 
             orderedItem.map(o => 
                 <SingleOrderHistoryItem key={o.idorder} id={ o.order_history_id } time={ o.timestamp } category={o.category} description={ o.description } name={ o.name } price={ o.price } quantity={ o.quantity }/>
           )}
           </div>
  </div>
)
}
