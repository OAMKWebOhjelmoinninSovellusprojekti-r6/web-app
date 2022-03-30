import React from 'react'
import CartItem from './CartItem'
import './ShoppingCartView.css'

export default function ShoppingCartView( {cartItems, deleteItem} ) {
    console.log(cartItems);
  return (
    <div className="itemContainer">
        {
            cartItems.map(c => 
                <CartItem key={c.idItem}
                    idItem={c.idItem}
                    name={c.itemName}
                    quantity={c.quantity}
                    deleteItem={deleteItem}
                />  
            )
        }
    </div>
  )
}
