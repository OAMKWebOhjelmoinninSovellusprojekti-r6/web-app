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

  restaurantAdd(data){
    return axios.post(API_URL + 'restaurant', data, { headers: authHeader() });
  }

  userCreate(userData){
    return axios.post(API_URL + 'user/', userData);
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

  postCartItem(item){
    return axios.post(API_URL + 'cart/', item, { headers: authHeader()});
  }

  orderHistoryCreate(historyData){
    return axios.post(API_URL + 'history', historyData, { headers: authHeader() })
  }

  ordreHistoryItemCreate(itemData){
    return axios.post(API_URL + 'historyItem', itemData, { headers: authHeader() })
  }
  userOrderHistoryGet(){
    return axios.get(API_URL + 'history', { headers: authHeader() });
  }
  userOrderHistoryDetailGet(orderId){
    return axios.get(API_URL + 'history/' + orderId, { headers: authHeader() } );
  }
  getMenu(restaurantId){
    return axios.get(API_URL + 'item/' + restaurantId);
  }

  itemAdd(data){
    return axios.post(API_URL + 'item', data, { headers: authHeader() });
  }
}
export default new UserService();
