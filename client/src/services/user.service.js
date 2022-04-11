import axios from 'axios';
import authHeader from './auth-header';
import api from './api.js';
const API_URL = process.env.REACT_APP_SERVER_HOST;
class UserService {

  restaurantGetAll() {
    return axios.get(API_URL + 'restaurant');
  }

  restaurantGetById(restaurantId){
    return axios.get(API_URL + 'restaurant/' + restaurantId);
  }

  restaurantAdd(data){
    return api.post(API_URL + 'restaurant', data);
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
}
export default new UserService();
