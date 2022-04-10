import React from 'react'
import './Restaurant.css'

export default function Restaurant(props) {
  console.log(props);
  return (
  <div className="restaurantItem" key={props.id}>
      <img className="image" src={ process.env.REACT_APP_SERVER_HOST + props.image } alt="RestaurantImage" height="220px"/>
      <div className="title">{props.name}</div>
      <div className="adress">{props.address}</div>
      <div className="adress">{props.openingHours}</div>
      <div className="price">{props.type}</div>
      <div className="price">PriceLevel { props.priceLevel }</div>
  </div>
  )
}
