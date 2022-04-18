import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom";
import UserService from "../../services/user.service";
import './Register.css';

export default function Register() {
  // Object data initialization
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    isOwner: 0
  })
  // Takes the input name and value and makes a deep copy of the object and saves the inserted values to object data
  const changeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log(typeof value, value);
    setNewUser(v => ({...v, [name]: value}))
  }
  // Make a create new user request
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {};
    data.username=event.target.username.value;
    data.password=event.target.password.value;
    data.firstName=event.target.firstName.value;
    data.lastName=event.target.lastName.value;
    data.address=event.target.address.value;
    data.phone=event.target.phone.value;
    data.isOwner=parseInt(event.target.isOwner.value);
    UserService.userCreate(data).then(response => {
      console.log("mennenee");
      return (<Navigate to={"/"}></Navigate>)
    });
  }
  return (
    <div className="register-container">
      <form 
        className="register-form"
        onSubmit={handleSubmit}
      >
        <label>Username</label>
        <input 
          type='text'
          className="register__form-element"
          name="username" 
          onChange={changeHandler} 
        />
        <label>Password</label>
        <input 
          type="password"
          className="register__form-element"
          name="password" 
          onChange={changeHandler} 
        />
        <label>First Name</label>
        <input 
          type='text' 
          className="register__form-element"
          name="firstName" 
          onChange={changeHandler} 
        />
        <label>Last Name</label>
        <input 
          type='text' 
          className="register__form-element"
          name="lastName" 
          onChange={changeHandler} 
        />
        <label>Address</label>
        <input 
          type='text' 
          className="register__form-element"
          name="address" 
          onChange={changeHandler} 
        />
        <label>Phone Number</label>
        <input 
          type='text' 
          className="register__form-element"
          name="phone" 
          onChange={changeHandler} 
        />
        <label>Account type</label>
        <select 
          name="isOwner" 
          className="register__form-element"
          onChange={changeHandler}
        >
          <option value="0">Customer</option>
          <option value="1">Restaurant owner</option>
        </select>
        <input className="button-general" type="submit" value="Create Account" />
      </form>
    </div>
  )
}
