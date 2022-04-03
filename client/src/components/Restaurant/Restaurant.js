import React from 'react'
import './Restaurant.css'

export default function Restaurant(props) {
  return (
  <div className="restaurantItem" key={props.id}>
      <img className="image" src={ props.image } alt="RestaurantImage" height="220px"/>
      <div className="title">{props.name}</div>
      <div className="address">{props.address}</div>
      <div className="address">{props.openingHours}</div>
      <div className="price">{props.type}</div>
      <div className="price">PriceLevel { props.priceLevel }</div>
  </div>
  )
}
