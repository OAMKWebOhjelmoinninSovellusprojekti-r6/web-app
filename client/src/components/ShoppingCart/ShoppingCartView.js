import React from 'react'
import CartItem from './CartItem'
import './ShoppingCartView.css'

export default function ShoppingCartView( {cartItems} ) {
    console.log(cartItems.shoppingCartInfo);
  return (
    <div className="itemContainer">
        {
            cartItems.shoppingCartInfo.map(c => 
                <CartItem key={c.idItem}
                    name={c.itemName}
                    quantity={c.quantity}
                />  
            )
            }
    </div>
  )
}
