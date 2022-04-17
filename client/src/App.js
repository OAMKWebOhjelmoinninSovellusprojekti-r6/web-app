import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import ProtectedRoute from './components/ProtectedRoute/protected-route.component';
import authService from './services/auth.service';

function App() {

  const cartId = 2; // Dummydata
  const userAddress = 'street 15'; // Dummydata
  const restaurantId = 6; // Dummydata
  const userId = 4 // Dummydata
  
  return (
  <div className="page-container">
    <BrowserRouter>
      <Navbar/>
      <main className="main-container">
        <Routes>
          <Route element={<ProtectedRoute user={ () => authService.getCurrentUser() } />}>
            <Route path="/user/add-restaurant" element={<AddRestaurant />} />
            <Route path="/user/cart" element={<Cart address={userAddress} userIndex={userId} restaurantIndex={restaurantId} cartIndex={cartId}/>} />
            <Route  path="/user/history" element={ <OrderHistoryListView /> } >
              <Route path=":orderId" element= {<SingleOrderHistory/>} />
            </Route>
            <Route  path="/user/history/owner/:restaurantId" element={ <OwnerOrderHistory/> } />
          </Route>
          <Route path="/" element={ <RestaurantListView /> } />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/restaurants/:restaurantId" element= {<MenuListView />} />
          <Route path="/restaurants/additem/:restaurantId" element = {<AddItem />} />  
      </Routes>
      </main>
    </BrowserRouter>
    </div>
  );
}
export default App;