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
  //const [cartId, setCartId] = useState(1);
  const [deletedItem, setDeletedItem] = useState('');
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
    // GET shoppingcart items
    const getCartItems = async (cartId) => {
      const results = await axios.get(`http://localhost:3001/cart/${cartId}`);
      setCartItems(results.data.shoppingCartInfo);
      console.log("GET results", results.data.shoppingCartInfo);
    }
    let cartId = 1;
    getCartItems(cartId);
  }, []);

  useEffect(() => {
    // DELETE item from cart
    console.log("use", deletedItem);
    const deleteItem = async () => {
      const results = await axios.delete(`http://localhost:3001/cart/${deletedItem}`);
      console.log("deleted");
    }
    if (deletedItem !== '') {
    deleteItem();
    }

  }, [deletedItem])
  
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
  console.log("cartitems", cartItems);
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
        <Route path="/cart" element={<Cart cartItems = {cartItems} deleteItem = {deleteItem}/>} />
        <Route  />
     </Routes>
  </BrowserRouter>
  );
}

export default App;