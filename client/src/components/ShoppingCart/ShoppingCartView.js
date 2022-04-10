import React from 'react';
import { useState, useEffect }  from 'react';
import CartItem from './CartItem';
import Total from './Total';
import styles from'./ShoppingCartView.module.css';
import DeliveryAddress from './DeliveryAddress';
import UserService from '../../services/user.service';

export default function ShoppingCartView( {cartIndex, address, userIndex, restaurantIndex} ) {

  const [cartItems, setCartItems] = useState([]);
  const [itemTotalSum, setItemTotalSum] = useState([]);
  const [allItemsTotal, setAllItemsTotal] = useState(0);

  let cartId = cartIndex;
  let userId = userIndex;
  let restaurantId = restaurantIndex;
  
  useEffect(() => {
    // GET shoppingcart items
    UserService.getCartItems(cartId).then(results => {
      console.log(results);
      setCartItems(results.data.shoppingCartInfo);
    });
    countTotal();
  }, []);

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
    UserService.deleteCartItem(index);

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
      UserService.modifyCartItems(idItem, quantity);
      countTotal();
    } else {
      alert("To remove item press Remove button")
    }
  }

  // Post order data into order history and order histort item in database
  const payOrder = () => {
    let historyId = 0;
    const jsonData = `{
      "total": ${allItemsTotal},
      "restaurantId": ${restaurantId},
      "userId": ${userId}
    }`;
    const historyData = JSON.parse(jsonData);
    console.log("historydata", historyData);
    
    UserService.orderHistoryCreate(historyData).then(results => {
      historyId = results.data.idorder_history;
      console.log("results", results.status);
      if(results.status === 200) {
        alert("Order confirmed");
      } else {
        alert("There was a problem with payment")
      }
    });    
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
            <DeliveryAddress deliveryAddress={address} payOrder={payOrder}/>
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
