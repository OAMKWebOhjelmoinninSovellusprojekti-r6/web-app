import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_SERVER_HOST;
class UserService {

  restaurantGetAll() {
    return axios.get(API_URL + 'restaurant');
  }

  restaurantGetById(restaurantId){
    return axios.get(API_URL + 'restaurant/' + restaurantId);
  }

  userCreate(userData){
    return axios.post(API_URL + 'user', userData);
  }

  userModify(userData){
      return axios.put(API_URL + 'user', userData, { headers: authHeader() });
  }

  userDelete(){
    return axios.delete(API_URL + 'user', { headers: authHeader() });
  }
  
  getCartItems(cartId){
    return axios.get(API_URL + 'cart/' + cartId, { headers: authHeader() });
  }

  deleteCartItem(itemId){
    return axios.delete(API_URL + 'cart/' + itemId, { headers: authHeader() });
  }

  modifyCartItems(itemId, quantity){
    return axios.put(API_URL + 'cart/' + itemId, {quantity}, { headers: authHeader() })
  }
}
export default new UserService();
