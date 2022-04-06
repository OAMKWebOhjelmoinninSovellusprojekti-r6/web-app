import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

export default function Register() {
  // Object data initialization
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    isOwner: '0'
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
    console.log("newuser", newUser);
    event.preventDefault()
    const add = async() => {
        //let clone = [...newUser];
        //console.log("clone", clone);
          const results = await axios.post('http://localhost:3001/user',
            newUser)
        console.log("results", results);
    }
    add(); 
  }
  return (
    <div>
        <div><button>Return to main page</button></div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>User Name<input type='text' name="username" value={newUser.username} onChange={changeHandler}></input></div>
            <div>Password<input type="password" name="password" value={newUser.password} onChange={changeHandler}></input></div>
            <div>First Name<input type='text' name="firstName" value={newUser.firstName} onChange={changeHandler}></input></div>
            <div>Last Name<input type='text' name="lastName" value={newUser.lastName} onChange={changeHandler}></input></div>
            <div>Address<input type='text' name="address" value={newUser.address} onChange={changeHandler}></input></div>
            <div>Phone Number<input type='text' name="phone" value={newUser.phone} onChange={changeHandler}></input></div>
            <div>Owner of a restaurant
              <div>Yes<input type="radio" name="isOwner" value={'1'} onChange={changeHandler}></input></div>
              <div>No<input type="radio" name="isOwner" value={'0'} onChange={changeHandler}></input></div>
            </div>
            <input type="submit" value="Create Account" />
          </form>
        </div>
    </div>
  )
}
