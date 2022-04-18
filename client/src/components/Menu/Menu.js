import React from 'react';
import './Menu.css';
import UserService from '../../services/user.service';
import { useAuthState } from '../../context/context';
import { Link } from 'react-router-dom';

export function Menu (props) {

        console.log(props);

        const currentUser = useAuthState();

        const postItem = (itemId, restaurantId) => {
                console.log("Jee")
                console.log(restaurantId)
                const item = {
                    itemId: itemId,
                    restaurantId: restaurantId
                };
                UserService.postCartItem(item).then( result => {
                        alert("Item added to shopping cart")
                });
            }
        
        // Create template elements
        let addToCartTemplate = '';
        if(currentUser){
                if(currentUser.isOwner === 0){
                        addToCartTemplate = <button className="button-general" type="button" onClick={ () => postItem(props.id, props.restaurantId) }>Add to cart</button>;
                }
        }

        return (
                <div className="menu-item" key={props.iditem}>
                        <article className="restaurant-card">
                                <section className="restaurant-card__image">
                                        <img
                                                className="image"
                                                src={ process.env.REACT_APP_SERVER_HOST + props.image }
                                                alt="No image available"
                                                height="220px"
                                                width="250px"
                                        />
                                </section>
                                <section className="restaurant-card__info">
                                        <h2>{props.name}</h2>
                                        <span>{props.description}</span>
                                        <span>{props.category}</span>
                                        <span>{props.price} €</span>
                                        { addToCartTemplate }
                                </section>
                        </article>  
                </div> 
        )
}

export function RestaurantInfo (props) {

        const currentUser = useAuthState();

        // Parse restaurant type
        let restaurantType = '-';
        if(props.restaurantType == 1){
        restaurantType = 'Buffet';
        } else if (props.restaurantType == 2){
        restaurantType = 'Fast food';
        } else if (props.restaurantType == 3){
        restaurantType = 'Fast casual';
        } else if (props.restaurantType == 4){
        restaurantType = 'Casual dining';
        } else if (props.restaurantType == 5){
        restaurantType = 'Fine dining';
        }

        // Parse price level
        let priceLevel = '-';
        if(props.priceLevel == 1){
        priceLevel = '€';
        } else if (props.priceLevel == 2){
        priceLevel = '€€';
        } else if (props.priceLevel == 3){
        priceLevel = '€€€';
        } else if (props.priceLevel == 4){
        priceLevel = '€€€€';
        }

        let addToMenuTemplate = '';
        if(currentUser){
                if(currentUser.isOwner === 1){
                        addToMenuTemplate = <Link to={"/user/add-item/" + props.id}>
                                <button className="button-general" type="button">Add item to menu</button>
                        </Link>
                }
        }
        return (    
                <div className="restaurant-info-card" key={props.id}>
                        <section className="restaurant-info-card__image">
                                <img src={ process.env.REACT_APP_SERVER_HOST + props.image } alt="No image available" />
                        </section>
                        <section className="restaurant-info-card__info">
                                <h2>{props.name}</h2>
                                <span>Address: {props.address}</span>
                                <span>Open: {props.openingHours}</span>
                                <span>Type: {restaurantType}</span>
                                <span>Price level: { priceLevel }</span>
                                { addToMenuTemplate }
                        </section>
                </div> 
        )       
}
