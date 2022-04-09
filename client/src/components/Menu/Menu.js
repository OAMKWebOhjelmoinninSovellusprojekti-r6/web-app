import React from 'react';
import './Menu.css';
import axios from 'axios' 
import {Link} from 'react-router-dom';






export function Menu (props) {

       

return (
    
        <div className="menu.item" key={props.iditem}>
                <div>ID: {props.id}</div>
                <img className="image" src={ props.image } alt="ItemImage" height="220px"/>
                <div className="title">Item: {props.name }</div>
                <div className="description">Description: {props.description }</div>
                <div className="description">Price: {props.price} €</div>
                <button onClick={ props.postItem }>Add to cart</button>                
        </div> 
        )
}

export function RestaurantInfo (props) {

return (    
    
        <div className="restaurantInfo" key={props.id}>
                <img className="image" src={ props.image } alt="RestaurantImage" height="220px"/>
                <div className="title">Restaurant: {props.name}</div>
                <div className="address">Address: {props.address}</div>
                <div className="address">Opening hours: {props.openingHours}</div>
                <div className="price">PriceLevel: { props.priceLevel }</div>
        </div>
    
        )       
}
