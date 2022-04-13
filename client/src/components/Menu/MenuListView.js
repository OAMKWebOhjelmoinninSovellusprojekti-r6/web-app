import React from 'react';
import { Menu, RestaurantInfo} from './Menu'
import axios from 'axios' 
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import UserService from '../../services/user.service';
import AuthService from "../../services/auth.service";

export default function MenuListView() {

    const [items, setItems] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const {restaurantId}= useParams();
    let currentUser = AuthService.getCurrentUser();
    console.log(currentUser);

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

if(currentUser.isOwner === 1) {
    return (
        
<div className="restaurantView">          
            <div className="menu">
                {items.map(i=>
                <Menu key={i.iditem} image={i.image_path} postItem={postItem} id={i.iditem} name={i.name} description={i.description} price={i.price} />)
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
else {
    return (

<div className="restaurantView">          
            <div className="menu">
                {items.map(i=>
                <Menu key={i.iditem} image={i.image_path} postItem={postItem} id={i.iditem} name={i.name} description={i.description} price={i.price} />)
                }     
            </div>
            <div className="restaurantInfo">  
                {restaurant.map(r=>
                <RestaurantInfo key={r.id}  image={r.image_path} name={r.name} address={r.address} openingHours={r.opening_hours} 
                priceLevel={r.price_level}/>
                )}
            </div>
</div>
    )
}
}