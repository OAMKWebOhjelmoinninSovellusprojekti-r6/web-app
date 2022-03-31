import React from 'react';
import axios from 'axios';
import { useState, useEffect }  from 'react';
import CartItem from './CartItem';
import Total from './Total';
import './ShoppingCartView.css';

export default function ShoppingCartView() {

  const [cartItems, setCartItems] = useState([]);
  const [deletedItem, setDeletedItem] = useState('');
  const [quantity, setModifiedItemQuantity] = useState('');
  const [modifiedItemId, setModifiedItemId] = useState('');
  const [itemTotalSum, setItemTotalSum] = useState([]);

  useEffect(() => {
    // GET shoppingcart items
    const getCartItems = async (cartId) => {
      const results = await axios.get(`http://localhost:3001/cart/${cartId}`);
      setCartItems(results.data.shoppingCartInfo);
      console.log("GET results", results.data.shoppingCartInfo);
    }
    // DUMMYDATA FOR DEVELOPMENT
    let cartId = 1;
    getCartItems(cartId);
  }, []);

  useEffect(() => {
    // DELETE item from cart
    const deleteItem = async () => {
      const results = await axios.delete(`http://localhost:3001/cart/${deletedItem}`);
      console.log("deleted", results);
    }
    if(deletedItem !== '') {
    deleteItem();
    }
  }, [deletedItem])

  // Modify cart item quantity
  useEffect(() => {
    const modItem = async () => {
      const results = await axios.put(`http://localhost:3001/cart/${modifiedItemId}`,
      {
        quantity
      });
      console.log("modified", results);
    }
    if(quantity !== '') {
      modItem();
    }
  }, [quantity]);

  // Count total sum of items in the shoppingcart
  useEffect(() => {
    console.log("HERE WE ARE");
    var tempArray =  [];
    let itemSum = 0;
    for(let i = 0; i < cartItems.length; i++) {
      itemSum = cartItems[i].price * cartItems[i].quantity;
      tempArray.push(itemSum);
      console.log(tempArray);
    }
    setItemTotalSum(tempArray);
    console.log("TOTALSUM", itemTotalSum);
  }, [deletedItem, quantity]);
  
  // DELETE item from client side and trigger useEffect for server item delete request
  const deleteItem = (index) => {
    console.log("delete item Index", index);
    console.log("delete Cart", cartItems);
    let clone = [...cartItems];
    let itemId = clone.findIndex(c => c.idItem === index);
    clone.splice(itemId, 1);
    setCartItems(clone);
    setDeletedItem(index);
  }
  // Modify quantity of item on server side and trigger useEffect for server item put request
  const changeQuantity = (idItem, quantity) => {
    console.log(idItem, quantity);
    let clone = [...cartItems];
    let index = clone.findIndex(c => c.idItem === idItem);
    if(index !== -1 && quantity > 0) {
      //const data = { "quantity": quantity};
      console.log(clone[index].quantity);
      clone[index].quantity = quantity;
      setCartItems(clone);
      setModifiedItemQuantity(quantity);
      setModifiedItemId(idItem);
      //console.log(data);
    } else {
      alert("To remove item press Remove")
    }
  }
  return (
    <div className="mainContainer">
      <div className="itemContainer">
        {
          cartItems.map(c => 
            <CartItem key={c.idItem}
              idItem={c.idItem}
              price={c.price}
              name={c.itemName}
              quantity={c.quantity}
              deleteItem={deleteItem}
              changeQuantity={changeQuantity}
            />  
          )
        }
      </div>
      <div className="itemContainer">
        {
          itemTotalSum.map(totalSum =>
            <Total 
              itemTotal={totalSum}
            />  
          )
        }
      </div>
        
    </div>
  )
}
