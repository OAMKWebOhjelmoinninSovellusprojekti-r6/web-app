import React from 'react'
import { Link } from 'react-router-dom';
import styles from'./ShoppingCartView.module.css';

export default function DeliveryAddress( {deliveryAddress, payOrder} ) {
  return (
    <div>
        <div>
            {'Delivering to: '}{deliveryAddress}
        </div>
        <div className={styles.contentRight}>
            <Link to="/restaurants"><button onClick={() => payOrder()}>Pay the order</button></Link> 
        </div>
    </div>
  )
}
