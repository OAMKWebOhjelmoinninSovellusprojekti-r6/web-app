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

  shoppingCartGet(){

  }
  userOrderHistoryGet(){
    return axios.get(API_URL + 'history', { headers: authHeader() });
  }
  userOrderHistoryDetailGet(orderId){
    return axios.get(API_URL + 'history/' + orderId, { headers: authHeader() } );
  }
}
export default new UserService();
