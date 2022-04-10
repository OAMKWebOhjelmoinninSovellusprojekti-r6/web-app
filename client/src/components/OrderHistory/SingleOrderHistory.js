import React from 'react'
import './OrderHistoryItem.css'
import axios from 'axios' 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import SingleOrderHistoryItem from './SingleOrderHistoryItem'
import UserService from "../../services/user.service";

export default function SingleOrderHistory() {

    const [orderedItem, setOrderedItem] = useState([]);
    const {orderId}= useParams();
    

  //get single orderhistory data from user
  useEffect(() => {
   const getData = async () => {
     const results = await UserService.userOrderHistoryDetailGet(orderId);
     //console.log(results.data.orderInfo);
         setOrderedItem(results.data.orderInfo);
     }
   getData();
   
},[orderId]); 
console.log(orderedItem);

  return (
       <div  >
            
            <h3>Details from order: { orderId }</h3>
             <div className="singleHistoryContainer">
              { 
                orderedItem.map(o => 
                    <SingleOrderHistoryItem key={o.idorder} id={ o.order_history_id } time={ o.timestamp } category={o.category} description={ o.description } name={ o.name } price={ o.price } quantity={ o.quantity }/>
              )}
              </div>
     </div>
  )
}
