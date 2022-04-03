import React from 'react';
import './Menu.css'

export function Menu (props) {

return (
    
        <div className="menu.item">
            <div><h1> {props.name }</h1></div>
            <div>Description: {props.description }</div>
           </div> 
       
        
        )
}

export function Restaurant (props) {

return (    
    
        <div className="restaurantInfo">
            
            <div><h1> {props.name }</h1></div>
            <div>Opening Hours: {props.opening_hours }</div>
            <div>Address: {props.address }</div>
            <div>Restaurant type: {props.restaurant_type}</div>
            <div>Price Level: {props.price_level}</div>
        </div>
    
        )       
}