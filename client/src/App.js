import './App.css';
import axios from 'axios'
import { useState, useEffect }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Search from './components/Search'
import Navbar from './components/Navbar'
import MenuListView from './components/MenuListView'

function App() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  //get restaurants data
   useEffect(() => {
    const getData = async () => {
      const results = await axios.get('/restaurant');
      setRestaurants(results.data);
      console.log(results.data);
    }
    getData();
},[]); 

//for searching menuitems and restaurants
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
}

  return (
  <BrowserRouter>
  <Navbar/>
      <Routes> 
        <Route  path="/restaurant" element={<Search searchValue = {searchTerm} onSearchChange ={handleSearchChange}/>}/>
        <Route path="/menu" element={<MenuListView/> } />
        <Route/>    
     </Routes>
  </BrowserRouter>
  );
}

export default App;
