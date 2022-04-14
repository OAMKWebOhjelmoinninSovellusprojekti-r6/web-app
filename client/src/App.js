import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar'
import RestaurantListView from './components/Restaurant/RestaurantListView';
import Cart from './components/ShoppingCart/ShoppingCartView'
import MenuListView from './components/Menu/MenuListView'
import UserProfile from './components/UserProfile/UserProfile'
import OrderHistoryListView from './components/OrderHistory/OrderHistoryListView'
import SingleOrderHistory from './components/OrderHistory/SingleOrderHistory';
import AddRestaurant from './components/AddRestaurant/add-restaurant.component';
import AddItem from './components/Menu/AddItem';
import OwnerOrderHistory from './components/OrderHistory/OwnerOrderHistory';

function App() {
  
  const cartId = 2; // Dummydata
  const userAddress = 'street 15'; // Dummydata
  const restaurantId = 6; // Dummydata
  const userId = 4 // Dummydata
  
  return (
  <BrowserRouter>
  <Navbar/>
      <Routes>

      <Route path="/" element={<RestaurantListView />}></Route>
        <Route path="/user/add-restaurant" element={<AddRestaurant />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart address={userAddress} userIndex={userId} restaurantIndex={restaurantId} cartIndex={cartId}/>} />
        <Route  path="/restaurants" element={ <RestaurantListView /> } />
        <Route path="/restaurants/:restaurantId" element= {<MenuListView />} >
      </Route>
          <Route path="/restaurants/additem/:restaurantId" element = {<AddItem />} />  
          <Route  path="/myprofile" element={ <UserProfile /> } />
          <Route  path="/history" element={ <OrderHistoryListView /> } >
            <Route path=":orderId" element= {<SingleOrderHistory/>} />
           </Route>
           <Route  path="/history/owner/:restaurantId" element={ <OwnerOrderHistory/> } />
     </Routes>
  </BrowserRouter>
  );
}
export default App;