import React from 'react'
import './OrderHistoryItem.css'

export default function OrderHistoryItem(props) {
  return (
        <div className="historyItem" key={props.id}>
            <div className="title">Ordernumber: {props.id}</div>
            <div className="title">{props.time}</div>
            <div className="title">Price: {props.total}€</div>
        </div>
  )
}
