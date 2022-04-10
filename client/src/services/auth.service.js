import axios from "axios";
const API_URL = process.env.REACT_APP_SERVER_HOST;

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "user/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.userData.accessToken) {
          localStorage.setItem("userData", JSON.stringify(response.data.userData));
        }
        return response.data.userData;
      });
  }

  logout() {
    localStorage.removeItem("userData");
  }

  refreshToken(){
    
  }

  changePassword(){

  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('userData'));;
  }
}
export default new AuthService();
