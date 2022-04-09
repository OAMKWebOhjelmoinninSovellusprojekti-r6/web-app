import './App.css';
import axios from 'axios'
import { useState, useEffect, Fragment }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar'
import RestaurantListView from './components/Restaurant/RestaurantListView';
import Cart from './components/ShoppingCart/ShoppingCartView'
import MenuListView from './components/Menu/MenuListView'
import UserProfile from './components/UserProfile/UserProfile'
import OrderHistoryListView from './components/OrderHistory/OrderHistoryListView'
import SingleOrderHistory from './components/OrderHistory/SingleOrderHistory';
import AddItem from './components/Menu/AddItem';
import ModifyItem from './components/Menu/ModifyItem';



function App() {
  
  //const [cartId, setCartId] = useState(1);
  const userAddress = 'street 15';
  
  return (
  <BrowserRouter>
  <NavBar/>
      <Routes>
        <Route path="/cart" element={<Cart address={userAddress}/>} />
        <Route  path="/restaurants" element={ <RestaurantListView /> } />
        <Route path="/restaurants/:restaurantId" element= {<MenuListView />} >
      </Route> 
        <Route path="/restaurants/additem/:restaurantId" element = {<AddItem />} />
        <Route path="/restaurants/modifyitem/:itemId" element = {<ModifyItem />} />
          <Route  path="/myprofile" element={ <UserProfile /> } />
          <Route  path="/history" element={ <OrderHistoryListView /> } >
            <Route path=":orderId" element= {<SingleOrderHistory/>} />
           </Route>
     </Routes>
  </BrowserRouter>
  );
}
export default App;