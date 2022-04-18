import axios from 'axios';
import authHeader from './auth-header';
import api from './api.js';
const API_URL = process.env.REACT_APP_SERVER_HOST;
class UserService {

  restaurantGetAll() {
    return axios.get(API_URL + 'restaurant');
  }
  restaurantGetByOwnerId(userId){
    console.log(userId);
    return axios.get(API_URL + 'restaurant/owner/' + userId);
  }

  restaurantGetById(restaurantId){
    return axios.get(API_URL + 'restaurant/' + restaurantId);
  }

  restaurantAdd(data){
    return api.post(API_URL + 'restaurant', data);
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
    return api.post(API_URL + 'cart/', item);
  }

  orderHistoryCreate(historyData){
    return api.post(API_URL + 'history', historyData)
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
  ownerOrderHistoryGet(restaurantId){
    return axios.get(API_URL + 'history/owner/' + restaurantId, { headers: authHeader() } );
  }

  /** Cart router actions */

  cartGetItems(){
    return api.get(API_URL + 'cart');
  }

  /** / Cart router actions */


  /** Item router actions */
  
  // Get items by restaurant id
  itemGetByRestaurantId(restaurantId){
    return axios.get(API_URL + 'item/' + restaurantId);
  }

  // Adds new item to restaurant
  itemAdd(data){
    return api.post(API_URL + 'item', data);
  }

  itemDelete(itemId){
    return api.delete(API_URL + 'item/' + itemId);
  }
}
export default new UserService();
