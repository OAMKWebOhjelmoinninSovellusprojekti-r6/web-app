import React from 'react';
import { Menu, RestaurantInfo} from './Menu'
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import UserService from '../../services/user.service';
import { useAuthState } from '../../context/context';
import './MenuListView.css';

export default function MenuListView() {

    const currentUser = useAuthState();
    const [items, setItems] = useState([]);
    const [restaurant, setRestaurant] = useState();
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

    // Group array objects by object value
    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        return result;
        }, {});
    };
    
    const getMenuTemplate = () => {
        // Create template for menu items
        let itemsTemplate = 'Restaurant doesnt have any menu items yet';
        if(items){
            itemsTemplate = [];
            const groupByCategory = groupBy(items, 'category');
            Object.entries(groupByCategory).forEach(entry => {
                const [key, value] = entry;
                let categoryTemplate = [];
                let headerTemplate = <h1>{key}</h1>;
                categoryTemplate.push(value.map( i => 
                    <Menu
                        key={i.iditem}
                        image={i.image_path}
                        id={i.iditem}
                        name={i.name}
                        description={i.description}
                        category = {i.category}
                        price={i.price}
                        restaurantId={i.restaurant_id}
                    />
                    )
                )
                itemsTemplate.push(
                    <div className="restaurant-category">
                        { headerTemplate }
                        <div className="restaurant-category__items">
                            { categoryTemplate }
                        </div>
                    </div>
                )
              });
        }
        
        let restaurantTemplate = 'Failed to get restaurant info';
        if(restaurant){
            restaurantTemplate = '';
            if(currentUser && currentUser.isOwner === 1){
                restaurantTemplate += <Link to={`/restaurants/additem/${restaurant.id}`} key={restaurant.id}>
                    <button className="button-general">Add item to menu</button>
                </Link>
            }
            
            restaurantTemplate = <RestaurantInfo 
                key={restaurant.id}
                id={restaurant.id}
                image={restaurant.image_path}
                name={restaurant.name}
                address={restaurant.address}
                openingHours={restaurant.opening_hours}
                restaurantType = {restaurant.restaurant_type}
                priceLevel={restaurant.price_level}
            /> 
        }

        return (
            <div className="restaurant-container">
                <div className="restaurant-menu">
                    { itemsTemplate }
                </div>
                <div className="restaurant-info">
                    { restaurantTemplate }
                </div>
            </div>
        )
    }
    return getMenuTemplate();
}