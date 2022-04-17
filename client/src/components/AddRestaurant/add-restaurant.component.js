import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import './add-restaurant.styles.css';

export default function AddRestaurant(){
    const [restaurantName, setRestaurantName] = useState();
    const [restaurantAddress, setRestaurantAddress] = useState();
    const [restaurantImage, setRestaurantImage] = useState();
    const [restaurantPriceLevel, setRestaurantPriceLevel] = useState("1");
    const [restaurantType, setRestaurantType] = useState("1");
    const [restaurantOpeningHours, setRestaurantOpeningHours] = useState();
    const [redirect, setRedirect] = useState();

    const inputEventName = (e) => {
        setRestaurantName(e.target.value)
    }
    const inputEventAddress = (e) => {
        setRestaurantAddress(e.target.value)
    }
    const inputEventImage = (e) => {
        setRestaurantImage(e.target.files[0])
    }
    const inputEventOpeningHours = (e) => {
        setRestaurantOpeningHours(e.target.value)
    }
    const inputEventPriceLevel = (e) => {
        setRestaurantPriceLevel(e.target.value)
    }
    const inputEventRestaurantType = (e) => {
        setRestaurantType(e.target.value)
    }

    const addRestaurant = (e) => {
        e.preventDefault();

        let data = new FormData()
        data.append('name', restaurantName);
        data.append('address', restaurantAddress);
        data.append('image', restaurantImage);
        data.append('priceLevel', restaurantPriceLevel);
        data.append('openingHours', restaurantOpeningHours);
        data.append('restaurantType', restaurantType);

        UserService.restaurantAdd(data).then(result => {
            setRedirect(result.data.restaurantId)
        });
    }

    if(!AuthService.getCurrentUser()){
        return(
            <Navigate to="/"></Navigate>
        )
    } else if(redirect){
        return(
            <Navigate to={'/restaurants/' + redirect}></Navigate>
        )
    } else {
        return (
            <div className="add-restaurant-container">
                <form
                    className="restaurant-form"
                    onSubmit={addRestaurant}
                >
                    <label>Restaurant name</label>
                    <input
                        className="restaurant__form-element"
                        type="text"
                        maxLength="50"
                        required
                        onChange={(e) => inputEventName(e)}
                    />
                    <label>Restaurant address</label>
                    <input
                        className="restaurant__form-element"
                        type="text"
                        maxLength="50"
                        required
                        onChange={inputEventAddress}
                    />
                    <label>Opening hours</label>
                    <input
                        className="restaurant__form-element"
                        type="text"
                        maxLength="20"
                        required
                        onChange={inputEventOpeningHours}
                    />
                    <label>Restaurant type</label>
                    <select
                        className="restaurant__form-element"
                        required
                        onChange={inputEventRestaurantType}
                    >
                        <option value="1">Buffet</option>
                        <option value="2">Fast food</option>
                        <option value="3">Fast casual</option>
                        <option value="4">Casual dining</option>
                        <option value="5">Fine dining</option>
                    </select>
                    <label>Price level</label>
                    <select
                        className="restaurant__form-element"
                        required
                        onChange={inputEventPriceLevel}
                    >
                        <option value="1">€</option>
                        <option value="2">€€</option>
                        <option value="3">€€€</option>
                        <option value="4">€€€€</option>
                    </select>
                    <label>Restaurant picture</label>
                    <input
                        className="restaurant__form-element"
                        type="file"
                        required
                        onChange={inputEventImage}
                    />
                    <input
                        className="restaurant__form-element"
                        type="submit"
                        value="Add restaurant"
                    />
                </form>
            </div>
        )
    }
}