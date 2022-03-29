import './App.css';
import axios from 'axios'
import { useState, useEffect }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Search/Search'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/ShoppingCart/ShoppingCartView'


function App() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(1);
/*
  useEffect(() => {
    //get restaurants data
    const getData = async () => {
      const results = await axios.get('/restaurant');
      setRestaurants(results.data);
      console.log(results.data);
    }
    getData();
  }, [] );
  */
  useEffect(() => {
    // Get shoppingcart items
    const getCartItems = async () => {
      const results = await axios.get(`http://localhost:3001/cart/${cartId}`);
      setCartItems(results.data);
    }
    getCartItems();
    console.log("cartitems", cartItems);
  }, []);

//for searching menuitems and restaurants
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
}

  return (
  <BrowserRouter>
  <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/restaurant" element={<Search searchValue = {searchTerm} onSearchChange ={handleSearchChange}/>} />
        <Route path="/cart" element={<Cart cartItems = {cartItems}/>} />
        <Route  />
     </Routes>
  </BrowserRouter>
  );
}

export default App;