import './App.css';
import axios from 'axios'
import { useState, useEffect, Fragment }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import RestaurantListView from './components/Restaurant/RestaurantListView';

function App() {

  
  return (
  <BrowserRouter>
  <NavBar/>
      <Routes> 
        <Route  path="/restaurants" element={ <RestaurantListView /> } >
          <Route path=":restaurantId" element= {<div>Here items of a single restaurant</div>} />
          </Route> 
     </Routes>
  </BrowserRouter>
  );
}

export default App;
