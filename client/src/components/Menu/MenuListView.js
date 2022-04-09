import React from 'react';
import { Menu, RestaurantInfo} from './Menu'
import axios from 'axios' 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import {Link} from 'react-router-dom';

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

    /*var itemId;
    for (let i = 0; i<items.length;i++) {
        itemId= items[i].iditem;
    }*/
    let postedItemIndex = items.findIndex(p=>p.iditem === items.map(i=>i.iditem));
    console.log ('itemin index:',postedItemIndex );
    //p => p.iditem === items.map (i=> i.iditem
    
    const item = {
        item_id: 1 ,
        shopping_cart_id: 1,
        quantity: 1
    };
    
    console.log('item:', item);

    async function postItem(){
        await axios.post(`http://www.localhost:3001/cart`, item)
    }

    /* async function postItem(items) {
        let postedItemIndex= items.findIndex(p => p.id === items.map (i=> i.iditem));
        await axios.post(`http://www.localhost:3001/cart`, postedItemIndex);   
    }*/

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

/*<button onClick={ postItem()}>Click here</button>
Link to={`/restaurants/modifyitem/${i.id}`} key={i.id}>
<button>Modify item</button>
                
</Link>*/