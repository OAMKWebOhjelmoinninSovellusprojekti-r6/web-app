import React from 'react'
import './OrderHistoryListView.css'
import axios from 'axios'
import { useState, useEffect }  from 'react';
import {  Link, Outlet } from 'react-router-dom';
import OrderHistoryItem from './OrderHistoryItem';
import UserService from "../../services/user.service";


export default function OrderHistoryListView() {
  
  const [orderedItems, setOrderedItems] = useState([]);

  //get orderhistory data from user
  useEffect(() => {
   const getData = async () => {
    const results = await UserService.userOrderHistoryGet();
     //console.log(results.data.orderHistoryInfo);
         setOrderedItems(results.data.orderHistoryInfo);
     }
   getData();
   
},[]); 
console.log(orderedItems);

let output = <h3>Orders:</h3>;
if (!orderedItems.length){
  output = <h3>You haven't yet ordered</h3>;
}

  return (
    <div className="historyContainer">
        
      <div className="orderHistoryContainer">
            {output}
              { 
                orderedItems.map(o => 
                  <Link to={`/history/${o.idorder_history}`} key={o.idorder_history}>
                    <OrderHistoryItem id={ o.idorder_history } time={ o.timestamp } total={ o.total } />
                 </Link>
              )}
              
        </div>
        <Outlet />
        </div>
  )
}
