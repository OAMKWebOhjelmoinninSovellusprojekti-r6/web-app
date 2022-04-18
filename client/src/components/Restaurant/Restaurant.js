import React from 'react'
import './Restaurant.css'
import { Link } from 'react-router-dom';

export default function Restaurant(props) {
  // Parse restaurant type
  let restaurantType = '-';
  if(props.type == 1){
    restaurantType = 'Buffet';
  } else if (restaurantType == 2){
    restaurantType = 'Fast food';
  } else if (restaurantType == 3){
    restaurantType = 'Fast casual';
  } else if (restaurantType == 4){
    restaurantType = 'Casual dining';
  } else if (restaurantType == 5){
    restaurantType = 'Fine dining';
  }

  // Parse price level
  let priceLevel = '-';
  if(props.priceLevel == 1){
    priceLevel = '€';
  } else if (props.priceLevel == 2){
    priceLevel = '€€';
  } else if (props.priceLevel == 3){
    priceLevel = '€€€';
  } else if (props.priceLevel == 4){
    priceLevel = '€€€€';
  }

  let linkUrl = `/restaurants/${props.id}`;
  if(props.altLink){
    linkUrl = props.altLink;
  }

  return (
    <div className="restaurant-item" key={props.id}>
      <article className="restaurant-card">
          <section className="restaurant-card__image">
            <Link className="restaurant-item" to={linkUrl}>
              <img src={ process.env.REACT_APP_SERVER_HOST + props.image } alt="No image available" />
            </Link>
          </section>
          <section className="restaurant-card__info">
            <h2>{props.name}</h2>
            <span>Address: {props.address}</span>
            <span>Open: {props.openingHours}</span>
            <span>Type: {restaurantType}</span>
            <span>Price level: { priceLevel }</span>
          </section>
      </article>
    </div>
  )
}
