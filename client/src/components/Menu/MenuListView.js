import React from 'react';
import { Menu, RestaurantInfo} from './Menu'
import axios from 'axios' 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

export default function MenuListView() {
    const [items, setItems] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const {restaurantId}= useParams();
    //Get all items based on restaurantId
    useEffect(() => {
      
        const getItems = async (restaurantId) => {
            const results = await axios.get(`http://www.localhost:3001/item/${restaurantId}`);
                setItems(results.data.itemInfo);
              
        }    
        
        //Get restaurant info to sidebar  
        const getRestaurant = async (restaurantId) => {
            const restInfo = await axios.get(`http://www.localhost:3001/restaurant/${restaurantId}`);
            
                setRestaurant(restInfo.data);
        }
        
        getRestaurant(restaurantId);
        getItems(restaurantId);
    },[]);
        console.log('Ravintolan tiedot:', restaurant);
        console.log('Ravintolan menu:', items);
    return (
        
 

<div className="restaurantView">
            
            <div className="menu">
                {items.map(i=>
                <Menu key={i.iditem} name={i.name} description={i.description} price={i.price}/>)
                }  
               
            </div>
            <div className="restaurantInfo">
                {restaurant.map(r=>
                <RestaurantInfo key={r.id} image={r.image_path} name={r.name} address={r.address} openingHours={r.opening_hours} 
                priceLevel={r.price_level}/>)
                }
            </div>
</div>
            )   
}