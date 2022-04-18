import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from'./ShoppingCartView.module.css';

export default function DeliveryAddress( {deliveryAddress, payOrder} ) {

  const [ternaryTrigger, setTernaryTrigger] = useState(false);
  const [customDeliveryAddress, setCustomDeliveryAddress] = useState(deliveryAddress);

  return (
    <div>
      <div>
      { ternaryTrigger === false
        ? <div>
            {'Delivering to: '}{customDeliveryAddress}
          </div>
        : <div>
          <input type="type" value={customDeliveryAddress} onChange={(event) => setCustomDeliveryAddress(event.target.value)} />
          </div>  
      }
      </div>
        <div>
          <button className="button-general" onClick={() => setTernaryTrigger(!ternaryTrigger)}>Change Delivery Address</button>
        </div>
        <div className={styles.contentRight}>
            <Link to="/"><button className="button-general" onClick={() => payOrder(customDeliveryAddress ? customDeliveryAddress : deliveryAddress)}>Pay the order</button></Link> 
        </div>
    </div>
  )
}
