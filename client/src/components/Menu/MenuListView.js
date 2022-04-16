import React from 'react';
import { Menu, RestaurantInfo} from './Menu'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import UserService from '../../services/user.service';

export default function MenuListView() {

    const [items, setItems] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const {restaurantId}= useParams();

    //Get all items based on restaurantId
    useEffect(() => {
        UserService.itemGetByRestaurantId(restaurantId).then(result => {
            setItems(result.data.itemInfo);
        });
        UserService.restaurantGetById(restaurantId).then(result => {
            if(result.data && result.data.length > 0){
                setRestaurant(result.data[0]);
            }
        });
    },[]);
    
    const getMenuTemplate = () => {
        // Create template for menu items
        let itemsTemplate = 'Restaurant doesnt have any menu items yet';
        if(items){
            itemsTemplate = items.map( i => 
                <Menu
                    key={i.iditem}
                    image={i.image_path}
                    id={i.iditem}
                    name={i.name}
                    description={i.description}
                    price={i.price}
                />
            )
        }

        let restaurantTemplate = 'Failed to get restaurant info';
        if(restaurant){
            restaurantTemplate = <RestaurantInfo 
                key={restaurant.id}
                image={restaurant.image_path}
                name={restaurant.name}
                address={restaurant.address}
                openingHours={restaurant.opening_hours} 
                priceLevel={restaurant.price_level}
            />
        }

        return (
            <div className="restaurantView">
                <div className="menu">
                    { itemsTemplate }
                </div>
                <div className="restaurant">
                    { restaurantTemplate }
                </div>
            </div>
        )
    }

    return getMenuTemplate();
}