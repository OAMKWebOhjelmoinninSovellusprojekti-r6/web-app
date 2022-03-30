import React from 'react'
import './CartItem.css'

export default function ( {idItem, name, quantity, deleteItem} ) {
    console.log(name);
  return (
    <div className='itemBox'>
        <div className='itemName adjCenter'>
            {name}
        </div>
        <div className='quantityBox'>
            <div className='adjCenter'>
                {quantity}
            </div>
            <div className='quantityButtons'>
                <button>+</button>
                <button>-</button>
            </div>
        </div>
        <div className='adjCenter'>
            <button onClick={() => deleteItem(idItem)}>Remove</button>
        </div>
    </div>
  )
}
