import React, { Component } from 'react'
import './AddItem.css'
import { useState, useEffect} from "react";
import axios from "axios"
import {Link, useParams, Navigate} from 'react-router-dom';
import UserService from "../../services/user.service";


export default class AddItem extends Component {
    

  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.inputEventName = this.inputEventName.bind(this);
    this.inputEventDescription = this.inputEventDescription.bind(this);
    this.inputEventPrice = this.inputEventPrice.bind(this);
    this.inputEventImage = this.inputEventImage.bind(this);
    this.inputEventCategory = this.inputEventCategory.bind(this);
    this.inputEventRestaurantId = this.inputEventRestaurantId.bind(this);
    this.state = {
        name: '',
        description: '',
        price: '',
        image: '',
        category: '', 
        restaurantId: '',
        redirect: null
    }
}

addItem(e){
    e.preventDefault();
    let data = new FormData()
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('price', this.state.price);
    data.append('image', this.state.image);
    data.append('category', this.state.category);
    data.append('restaurantId', this.state.restaurantId);
    UserService.itemAdd(data).then(result => {
        this.setState({
            redirect: result.data.itemId
        })
    });
}

inputEventName(e){
    this.setState({
            name: e.target.value
    })
}
inputEventDescription(e){
    this.setState({
            description: e.target.value
    })
}
inputEventPrice(e){
  this.setState({
          price: e.target.value
  })
}
inputEventImage(e){
    this.setState({
          image: e.target.files[0]
    })
}

inputEventCategory(e){
    this.setState({
            category: e.target.value
    })
}

inputEventRestaurantId(e){
  this.setState({
          restaurantId: e.target.value
  })
}

render() {
    if(this.state.redirect){
        return(
            <Navigate to={'/restaurants/' + this.state.redirect}></Navigate>
        )
    } else {
        return (
            <div className="item-container">
                <form
                    className="item-form"
                    onSubmit={this.addItem}
                >
                    <label>Item name</label>
                    <input
                        className="item__form-element"
                        type="text"
                        maxLength="50"
                        required
                        onChange={this.inputEventName}
                    />
                    <label>Description</label>
                    <input
                        className="item__form-element"
                        type="text"
                        maxLength="50"
                        required
                        onChange={this.inputEventDescription}
                    />
                    <label>Price</label>
                    <input
                        className="item__form-element"
                        type="text"
                        maxLength="20"
                        required
                        onChange={this.inputEventPrice}
                    />
                    <label>Category</label>
                    <input
                        className="item__form-element"
                        type="text"
                        maxLength="20"
                        required
                        onChange={this.inputEventCategory}
                    />
                    <label>Restaurant Id</label>
                    <input
                        className="item__form-element"
                        type="text"
                        maxLength="20"
                        required
                        onChange={this.inputEventRestaurantId}
                    />
                    <label>Item picture</label>
                    <input
                        className="item__form-element"
                        type="file"
                        required
                        onChange={this.inputEventImage}
                    />
                    <input
                        className="item__form-element"
                        type="submit"
                        value="Add item"
                    />
                </form>
            </div>
        )
    }
}
}