import React from 'react'
import './OrderHistoryItem.css'

export default function OwnerOrderHistoryItem(props) {

    let time = new Date(props.time).toLocaleTimeString().substring(0,5);
  let date = new Date(props.time).toLocaleDateString().substring(0,10);
  let datetime = date+" "+time;
  
  return (

    <div className="ownerHistoryItem">
            <div className="title">Ordernumber: {props.id}</div>
            <div className="title">Ordered: {datetime}</div>
            <div className="title">Product: {props.name}</div>
            <div className="title">Quantity: {props.quantity}</div>
            <div className="title">Price: {props.price*props.quantity}€</div> 
            <div className="title">Customer: { props.firstName } { props.lastName }</div>
            <div className="title">Deliver to:  {props.address}</div>
            
             
    </div>
  )
}
