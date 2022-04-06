import React from 'react'
import './OrderHistoryItem.css'

export default function SingleOrderHistoryItem(props) {
  return (

    <div className="historyItem">
            <div className="title">Product's name {props.name}</div>
            <div className="title">Product's description {props.description}</div>
            <div className="title">Product's category {props.category}</div>
            <div className="title">Product's price {props.price}€</div>
            <div className="title">Quantity of bought items {props.quantity}</div>  
    </div>
  )
}
