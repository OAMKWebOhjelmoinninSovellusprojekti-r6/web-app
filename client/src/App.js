import './App.css';
import axios from 'axios'
import { useState, useEffect, Fragment }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import RestaurantListView from './components/Restaurant/RestaurantListView';
import Cart from './components/ShoppingCart/ShoppingCartView'
import MenuListView from './components/Menu/MenuListView'



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
     </Routes>
  </BrowserRouter>
  );
}
export default App;