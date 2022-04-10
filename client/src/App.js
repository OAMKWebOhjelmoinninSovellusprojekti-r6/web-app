import './App.css';
import axios from 'axios';
import { useState, useEffect, Fragment }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from './components/Register/Register';
import NavBar from './components/Navbar/Navbar'
import RestaurantListView from './components/Restaurant/RestaurantListView';
import Cart from './components/ShoppingCart/ShoppingCartView'
import MenuListView from './components/Menu/MenuListView'
import UserProfile from './components/UserProfile/UserProfile'
import OrderHistoryListView from './components/OrderHistory/OrderHistoryListView'
import SingleOrderHistory from './components/OrderHistory/SingleOrderHistory';

function App() {
  
  const cartId = 2; // Dummydata
  const userAddress = 'street 15'; // Dummydata
  const restaurantId = 6; // Dummydata
  const userId = 4 // Dummydata
  
  return (
  <BrowserRouter>
  <NavBar/>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart address={userAddress} userIndex={userId} restaurantIndex={restaurantId} cartIndex={cartId}/>} />
        <Route  path="/restaurants" element={ <RestaurantListView /> } />
        <Route path="/restaurants/:restaurantId" element= {<MenuListView />} >
          </Route> 
          <Route  path="/myprofile" element={ <UserProfile /> } />
          <Route  path="/history" element={ <OrderHistoryListView /> } >
            <Route path=":orderId" element= {<SingleOrderHistory/>} />
           </Route>
     </Routes>
  </BrowserRouter>
  );
}
export default App;