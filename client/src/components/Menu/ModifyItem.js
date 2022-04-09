import React from 'react'
import './AddItem.css'
import { useState, useEffect} from "react";
import axios from "axios"
import {Link} from 'react-router-dom';

export default function ModifyItem() {

    const [modifyItem, setModifyItem] = useState({
        iditem: "",
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
        setModifyItem(v => ({...v, [name]: value}))
      }

      const handleSubmit = (event) => {
        console.log("modifiedItem", modifyItem);
        event.preventDefault()
        const modifyItem = async() => {
              const results = await axios.put('http://localhost:3001/item',
                modifyItem)
            console.log("results", results);
        }
        modifyItem(); 
      }
      return (
        <div>
            <div>
            <Link to="/restaurants/">
                <button>Return to restaurant menu</button></Link>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div>Id:<input type='text' name="iditem" value={modifyItem.iditem} onChange={changeHandler}></input></div>
                <div>Name:<input type='text' name="name" value={modifyItem.name} onChange={changeHandler}></input></div>
                <div>Description:<input type="text" name="description" value={modifyItem.description} onChange={changeHandler}></input></div>
                <div>Price:<input type='text' name="price" value={modifyItem.price} onChange={changeHandler}></input></div>
                <div>Image path:<input type='text' name="image_path"value={modifyItem.image_path} onChange={changeHandler}></input></div>
                <div>Category:<input type='text' name="category" value={modifyItem.category} onChange={changeHandler}></input></div>
                <div>Restaurant Id:<input type='text' name="restaurant_id" value={modifyItem.restaurant_id} onChange={changeHandler}></input></div>
                <input type="submit" value="Modify item data" />
              </form>
            </div>
        </div>
      )
    }