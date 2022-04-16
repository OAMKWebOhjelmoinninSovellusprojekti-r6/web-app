import React from 'react';
import './Menu.css';
import AuthService from "../../services/auth.service";
import UserService from '../../services/user.service';

export function Menu (props) {

        let currentUser = AuthService.getCurrentUser();

        const postItem = (itemId) => {
                const item = {
                    itemId: itemId 
                };
                UserService.postCartItem(item).then( result => {
                        alert("Item added to shopping cart")
                });
            }
        
        // Create template elements
        let addToCartTemplate = '';
        if(currentUser){
                if(currentUser.isOwner === 0){
                        addToCartTemplate = <button type="button" onClick={ () => postItem(props.id) }>Add to cart</button>;
                }
        }

        return (
                <div className="menuitem" key={props.iditem}>
                        <img
                                className="image"
                                src={ process.env.REACT_APP_SERVER_HOST + props.image }
                                alt="ItemImage"
                                height="220px"
                                width="250px"
                        />
                        <div className="title">Item: {props.name }</div>
                        <div className="description">Description: {props.description }</div>
                        <div className="description">Price: {props.price} €</div>
                        { addToCartTemplate }           
                </div> 
        )
}

export function RestaurantInfo (props) {
        return (    
                <div className="restaurantInfo" key={props.id}>
                        <img className="image" src={ process.env.REACT_APP_SERVER_HOST + props.image } alt="RestaurantImage" height="220px" width="220px"/>
                        <div className="title">Restaurant: {props.name}</div>
                        <div className="address">Address: {props.address}</div>
                        <div className="address">Opening hours: {props.openingHours}</div>
                        <div className="price">PriceLevel: { props.priceLevel }</div>
                </div> 
        )       
}
