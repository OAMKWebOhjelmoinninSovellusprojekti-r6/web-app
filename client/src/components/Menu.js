import React from 'react';
import './Menu.css'

export default function Menu (props) {

return (
    <div className="restaurantView">
        <div className="menuItem">
            <div><h1> {props.name }</h1></div>
            <div>Description: {props.description }</div>
            </div>
        <div className="restaurantInfo">
            
            <div><h1> {props.name }</h1></div>
            <div>Opening Hours: {props.opening_hours }</div>
        </div>
    </div>
        )
}