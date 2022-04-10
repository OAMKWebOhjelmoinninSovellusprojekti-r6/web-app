import React from 'react';
import axios from 'axios';
import { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import Total from './Total';
import styles from'./ShoppingCartView.module.css';
import DeliveryAddress from './DeliveryAddress';

export default function ShoppingCartView( {address} ) {

  const [cartItems, setCartItems] = useState([]);
  const [quantity, setModifiedItemQuantity] = useState('');
  const [modifiedItemId, setModifiedItemId] = useState('');
  const [itemTotalSum, setItemTotalSum] = useState([]);
  const [allItemsTotal, setAllItemsTotal] = useState(0);

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
    countTotal();
  }, []);
  
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

  // Count total sum of items in the shoppingcart and make
  // new array of objects for the results

  const countTotal = () => {
    var tempArray =  []
    var tempObj = {'id': 'empty', 'name': 'empty', 'total': 0};
    let itemSum = 0;
    let tempAllItemSum = 0;
    for(let i = 0; i < cartItems.length; i++) {
      itemSum = cartItems[i].price * cartItems[i].quantity;
      tempAllItemSum += itemSum;
      tempObj.id = cartItems[i].idItem
      tempObj.name = cartItems[i].itemName;
      tempObj.total = itemSum.toFixed(2);
      console.log("tempobj", tempObj);
      tempArray.push({...tempObj});
    }
    setAllItemsTotal(tempAllItemSum.toFixed(2));
    setItemTotalSum(tempArray);
    console.log("TOTALSUM", itemTotalSum);
  };
  
  // DELETE item from client side and send server item delete request
  const deleteItem = (index) => {
    console.log("delete item Index", index);
    console.log("delete Cart", cartItems);
    let clone = [...cartItems];
    let itemId = clone.findIndex(c => c.idItem === index);
    clone.splice(itemId, 1);
    setCartItems(clone);
    axios.delete(`http://localhost:3001/cart/${index}`)
    countTotal();
  }
  // Modify quantity of item on server side and trigger useEffect for server item put request
  const changeQuantity = (idItem, quantity) => {
    console.log(idItem, quantity);
    let clone = [...cartItems];
    let index = clone.findIndex(c => c.idItem === idItem);
    if(index !== -1 && quantity > 0) {
      console.log(clone[index].quantity);
      clone[index].quantity = quantity;
      setCartItems(clone);
      setModifiedItemQuantity(quantity);
      setModifiedItemId(idItem);
      countTotal();
    } else {
      alert("To remove item press Remove button")
    }
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.itemContainer}>
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
        <div className={styles.contentRight}>
          <div className={styles.deliveryBox}>
            <DeliveryAddress deliveryAddress={address}/>
            <div className={styles.contentRight}>
              <Link to="/restaurants"><button>Pay the order</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        {
          itemTotalSum.map(c =>
            <Total key={c.id}
              itemTotal={c.total}
              name={c.name}
            />  
          )
        }
            <div className={styles.itemTotal}>
              <div>{'All items total'}</div>
              <div>{allItemsTotal}</div>
            </div> 
      </div>
    </div>
  )
}
