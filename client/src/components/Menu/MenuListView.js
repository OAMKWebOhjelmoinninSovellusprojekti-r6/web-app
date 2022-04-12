import React from 'react';
import { Menu, RestaurantInfo} from './Menu'
import axios from 'axios' 
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import UserService from '../../services/user.service';

export default function MenuListView() {

    const [items, setItems] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const {restaurantId}= useParams();

    //Get all items based on restaurantId
    useEffect(() => {
        UserService.getMenu(restaurantId).then(result => {
          setItems(result.data.itemInfo);
        });
        
        UserService.restaurantGetById(restaurantId).then(result => {
              setRestaurant(result.data);
        });
    },[]);
    
        async function postItem(itemId){
        const item = {
            itemId: itemId 
        };
        UserService.postCartItem(item);
    }
        console.log('Ravintolan tiedot:', restaurant);
        console.log('Ravintolan menu:', items);   

    return (
        
<div className="restaurantView">          
            <div className="menu">
                {items.map(i=>
                <Menu key={i.iditem} postItem={postItem} id={i.iditem} name={i.name} description={i.description} price={i.price} />)
                }     
            </div>
            <div className="restaurantInfo">  
                {restaurant.map(r=>
                <Link to={`/restaurants/additem/${r.id}`} key={r.id}>
                <button>Add item to menu</button>
                <RestaurantInfo  image={r.image_path} name={r.name} address={r.address} openingHours={r.opening_hours} 
                priceLevel={r.price_level}/>
                </Link>
                )}
            </div>
</div>
            )   
}