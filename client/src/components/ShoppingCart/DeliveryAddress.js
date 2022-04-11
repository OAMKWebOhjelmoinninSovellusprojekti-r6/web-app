import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from'./ShoppingCartView.module.css';

export default function DeliveryAddress( {deliveryAddress, payOrder} ) {

  const [ternaryTrigger, setTernaryTrigger] = useState(false);
  const [customDeliveryAddress, setCustomDeliveryAddress] = useState('');

  return (
    <div>
      <div>
      { ternaryTrigger === false
        ? <div>
            {'Delivering to: '}{deliveryAddress}
          </div>
        : <div>
          Testi
          </div>  
      }
      </div>
        <div>
          <button onClick={() => setTernaryTrigger(!ternaryTrigger)}>Change Delivery Address</button>
        </div>
        <div className={styles.contentRight}>
            <Link to="/restaurants"><button onClick={() => payOrder()}>Pay the order</button></Link> 
        </div>
    </div>
  )
}
