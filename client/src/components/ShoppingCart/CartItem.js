import React from 'react'
import './CartItem.css'

export default function( {idItem, name, price, quantity, deleteItem, changeQuantity} ) {
    let currencySign = '€'
  return (
    <div className='itemBox'>
        <div className='itemName adjCenter'>
            {name}
        </div>
        <div className='adjCenter'>
            {price}{currencySign}
        </div>
        <div className='quantityBox'>
            <div className='adjCenter'>
                {'x'}{quantity}
            </div>
            <div className='quantityButtons'>
                <button onClick={() => changeQuantity(idItem, quantity + 1)}>+</button>
                <button onClick={() => changeQuantity(idItem, quantity -1)}>-</button>
            </div>
        </div>
        <div className='adjCenter'>
            <button onClick={() => deleteItem(idItem)}>Remove</button>
        </div>
    </div>
  )
}
