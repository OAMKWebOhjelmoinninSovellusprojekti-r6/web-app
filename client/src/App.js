import './App.css';
import axios from 'axios'
import { useState, useEffect }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Search from './components/Search/Search'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/ShoppingCart/ShoppingCartView'


function App() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  //const [cartId, setCartId] = useState(1);
  const userAddress = 'street 15';

  useEffect(() => {
    //get restaurants data
    const getData = async () => {
      const results = await axios.get('/restaurant');
      setRestaurants(results.data);
      console.log(results.data);
    }
    getData();
  }, [] );


//for searching menuitems and restaurants
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
}

  return (
  <BrowserRouter>
  <Navbar/>
      <Routes>
        <Route  path="/restaurant" element={<Search searchValue = {searchTerm} onSearchChange ={handleSearchChange}/>} />
        <Route path="/cart" element={<Cart address={userAddress}/>} />
        <Route  />
     </Routes>
  </BrowserRouter>
  );
}

export default App;