import './App.css';
import axios from 'axios';
import { useState, useEffect, Fragment }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import RestaurantListView from './components/Restaurant/RestaurantListView';
import Cart from './components/ShoppingCart/ShoppingCartView';
import Register from './components/Register/Register';

function App() {
  
  //const [cartId, setCartId] = useState(1);
  const userAddress = 'street 15'; // Dummydata
  
  return (
  <BrowserRouter>
  <NavBar/>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart address={userAddress}/>} />
        <Route  path="/restaurants" element={ <RestaurantListView /> } >
          <Route path=":restaurantId" element= {<div>Here items of a single restaurant</div>} />
          </Route> 
     </Routes>
  </BrowserRouter>
  );
}
export default App;