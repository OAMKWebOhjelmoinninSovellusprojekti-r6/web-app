import React from 'react';
import { useState, useEffect }  from 'react';
import CartItem from './CartItem';
import Total from './Total';
import styles from'./ShoppingCartView.module.css';
import DeliveryAddress from './DeliveryAddress';
import UserService from '../../services/user.service';
import { useAuthState } from '../../context/context';

export default function ShoppingCartView(){

  const currentUser = useAuthState();

  const [cartItems, setCartItems] = useState([]);
  const [itemTotalSum, setItemTotalSum] = useState([]);
  const [allItemsTotal, setAllItemsTotal] = useState(0);
  const [cartView, setCartView] = useState(false);
  const [syncCartView, setSyncCartView] = useState(false);
  
  useEffect(() => {
      // GET shoppingcart items
    UserService.cartGetItems().then(results => {
      setCartItems(results.data);
      setCartView(true);
    });

  }, [syncCartView]);

  useEffect(() => {
    countTotal();
  }, [cartItems])

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
      tempArray.push({...tempObj});
    }
    setAllItemsTotal(tempAllItemSum.toFixed(2));
    setItemTotalSum(tempArray);
  };
  
  // DELETE item from client side and send server item delete request
  const deleteItem = (index) => {
    let clone = [...cartItems];
    let itemId = clone.findIndex(c => c.idItem === index);
    clone.splice(itemId, 1);
    setCartItems(clone);
    UserService.deleteCartItem(index).then(() => {
      setSyncCartView(!syncCartView);
    });
  }
  // Modify quantity of item on server side and trigger useEffect for server item put request
  const changeQuantity = (idItem, quantity) => {
    let clone = [...cartItems];
    let index = clone.findIndex(c => c.idItem === idItem);
    if(index !== -1 && quantity > 0) {
      clone[index].quantity = quantity;
      setCartItems(clone);
      UserService.modifyCartItems(idItem, quantity);
    } else {
      alert("To remove item press Remove button")
    }
  }

  // Post order data into order history and order histort item in database
  const payOrder = (deliveryAddress) => {
    let postData = {
      restaurantId: cartItems[0].idrestaurant,
      totalAmount: allItemsTotal,
      deliveryAddress: deliveryAddress
    }
    // Create order history data and send request
    UserService.orderHistoryCreate(postData).then(results => {
      let historyId = results.data.idorder_history || null;
      if(historyId != null && results.status === 200){
        // If accepted order history id is send as response and used on client side for making order history item request
        for(let i = 0; i < cartItems.length; i++) {
          let item = {};
          item.name = cartItems[i].itemName || null;
          item.description = cartItems[i].description || null;
          item.price = cartItems[i].price || null;
          item.category = cartItems[i].category || null;
          item.order_history_id = historyId || null;
          item.quantity = cartItems[i].quantity || null;
          UserService.ordreHistoryItemCreate(item).then( response => {
            return UserService.deleteCartItem(cartItems[i].idItem)
          }).catch(err => {
            console.log(err);
          })
        }
        alert("Order confirmed");
      } else {
        alert("There was a problem with payment")
      }
    });    
  }
  if(!cartItems || cartItems.length == 0){
    return (
      <div className={styles.emptyCart}>
          <div>Shoppingcart is empty</div>
      </div>
    )
  } else {
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
              <DeliveryAddress deliveryAddress={currentUser.address} payOrder={payOrder}/>
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
}
