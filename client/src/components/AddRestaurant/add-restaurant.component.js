import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import UserService from "../../services/user.service";
import './add-restaurant.styles.css';

export default class AddRestaurant extends Component {
  
    constructor(props) {
        super(props);
        this.addRestaurant = this.addRestaurant.bind(this);
        this.inputEventName = this.inputEventName.bind(this);
        this.inputEventAddress = this.inputEventAddress.bind(this);
        this.inputEventImage = this.inputEventImage.bind(this);
        this.inputEventOpeningHours = this.inputEventOpeningHours.bind(this);
        this.inputEventPriceLevel = this.inputEventPriceLevel.bind(this);
        this.inputEventRestaurantType = this.inputEventRestaurantType.bind(this);
        this.state = {
            name: '',
            address: '',
            image: '',
            priceLevel: "1",
            type: "1",
            openingHours: '',
            redirect: null
        }
    }

    addRestaurant(e){
        e.preventDefault();
        let data = new FormData()
        data.append('name', this.state.name);
        data.append('address', this.state.address);
        data.append('image', this.state.image);
        data.append('priceLevel', this.state.priceLevel);
        data.append('openingHours', this.state.openingHours);
        data.append('restaurantType', this.state.type);
        UserService.restaurantAdd(data).then(result => {
            this.setState({
                redirect: result.data.restaurantId
            })
        });
    }

    inputEventName(e){
        this.setState({
                name: e.target.value
        })
    }
    inputEventAddress(e){
        this.setState({
                address: e.target.value
        })
    }
    inputEventImage(e){
        this.setState({
                image: e.target.files[0]
        })
    }
    inputEventOpeningHours(e){
        this.setState({
                openingHours: e.target.value
        })
    }
    inputEventPriceLevel(e){
        this.setState({
                priceLevel: e.target.value
        })
    }
    inputEventRestaurantType(e){
        this.setState({
                restaurantType: e.target.value
        })
    }

  render() {
        if(this.state.redirect){
            return(
                <Navigate to={'/restaurants/' + this.state.redirect}></Navigate>
            )
        } else {
            return (
                <div className="restaurant-container">
                    <form
                        className="restaurant-form"
                        onSubmit={this.addRestaurant}
                    >
                        <label>Restaurant name</label>
                        <input
                            className="restaurant__form-element"
                            type="text"
                            maxLength="50"
                            required
                            onChange={this.inputEventName}
                        />
                        <label>Restaurant address</label>
                        <input
                            className="restaurant__form-element"
                            type="text"
                            maxLength="50"
                            required
                            onChange={this.inputEventAddress}
                        />
                        <label>Opening hours</label>
                        <input
                            className="restaurant__form-element"
                            type="text"
                            maxLength="20"
                            required
                            onChange={this.inputEventOpeningHours}
                        />
                        <label>Restaurant type</label>
                        <select
                            className="restaurant__form-element"
                            required
                            onChange={this.inputEvenRestaurantType}
                        >
                            <option value="1">Fast food</option>
                            <option value="2">Slow food</option>
                            <option value="3">Food with intermediate interval</option>
                            <option value="4">Timeless food</option>
                            <option value="5">Food from future</option>
                        </select>
                        <label>Price level</label>
                        <select
                            className="restaurant__form-element"
                            required
                            onChange={this.inputEventPriceLevel}
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
                            onChange={this.inputEventImage}
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
}
