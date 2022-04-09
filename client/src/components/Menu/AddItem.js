import React from 'react'
import './AddItem.css'
import { useState, useEffect} from "react";
import axios from "axios"
import {Link} from 'react-router-dom';

export default function AddItem() {

    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        price: "",
        image_path: "",
        category: "",
        restaurant_id: ""
    })

    const changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(typeof value, value);
        setNewItem(v => ({...v, [name]: value}))
      }

      const handleSubmit = (event) => {
        console.log("newItem", newItem);
        event.preventDefault()
        const addItem = async() => {
              const results = await axios.post('http://localhost:3001/item',
                newItem)
            console.log("results", results);
        }
        addItem(); 
      }
      return (
        <div>
            <div>
            <Link to="/restaurants" className="btn">Return to restaurant page</Link>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div>Name:<input type='text' name="name" required value={newItem.name} onChange={changeHandler}></input></div>
                <div>Description:<input type="text" name="description" required value={newItem.description} onChange={changeHandler}></input></div>
                <div>Price:<input type='text' name="price" required value={newItem.price} onChange={changeHandler}></input></div>
                <div>Image path:<input type='text' name="image_path" required value={newItem.image_path} onChange={changeHandler}></input></div>
                <div>Category:<input type='text' name="category" required value={newItem.category} onChange={changeHandler}></input></div>
                <div>Restaurant Id:<input type='text' name="restaurant_id" required value={newItem.restaurant_id} onChange={changeHandler}></input></div>
                <input type="submit" value="Add new item to menu" />
              </form>
            </div>
        </div>
      )
    }
