import React from 'react'
import './OrderHistoryItem.css'

export default function OrderHistoryItem(props) {

  let time = new Date(props.time).toLocaleTimeString().substring(0,5);
  let date = new Date(props.time).toLocaleDateString().substring(0,10);
  let datetime = date+" "+time;
  return (
        <div className="historyItem" key={props.id}>
            <div className="title">Ordernumber: {props.id}</div>
            <div className="title">Ordered: {datetime}</div>
            <div className="title">Price: {props.total}€</div>
        </div>
  )
}
