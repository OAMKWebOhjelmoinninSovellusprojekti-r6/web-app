import React from 'react';
import { Menu, Restaurant} from './Menu'
import axios from 'axios' 
import { useState, useEffect} from 'react';

export default function MenuListView( {props} ) {
    const [items, setItems] = useState([]);
    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const results = await axios.get('http://www.localhost:3001/item/3');
            console.log(results.data.itemInfo);
                setItems([results.data.itemInfo]);
        }
        getItems();
        console.log(items);
    },[]);

    useEffect(() => {
        const getRestaurant = async () => {
            const restInfo = await axios.get('http://www.localhost:3001/restaurant/3');
            console.log(restInfo.data.restaurantInfo);
                setRestaurant([restInfo.data.restaurantInfo]);
        }
        getRestaurant();
        console.log(restaurant);
    },[]);

    return (
        
 

 <div className="restaurantView">
            
            <div className="menu">
                {items.map(i=>
                <Menu key={i.iditem} name={i.name} description={i.description}/>)
                 }  
                 {items.map(i=>
                <Menu key={i.iditem} name={i.name} description={i.description}/>)
                 }        
                 {items.map(i=>
                <Menu key={i.iditem} name={i.name} description={i.description}/>)
                 }     
                 {items.map(i=>
                <Menu key={i.iditem} name={i.name} description={i.description}/>)
                 }                  
            </div>
            <div className="restaurantInfo">
                {restaurant.map(r=>
                <Restaurant key={r.idrestaurant} name={r.name} address={r.address}opening_hours={r.opening_hours}/>)
                }
            </div>
            </div>
            )   
}