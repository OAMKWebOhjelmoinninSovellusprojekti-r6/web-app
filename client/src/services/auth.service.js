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

  parseTokenPayload(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('userData'));;
  }

  getCurrentUserId(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    let payload = this.parseTokenPayload(userData.accessToken);
    return payload.userData.userId;
  }

  getLocalAccessToken(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    return userData?.accessToken;
  }

  updateLocalAccessToken(token){
    let user = JSON.parse(localStorage.getItem("userData"));
    user.accessToken = token;
    localStorage.setItem("userData", JSON.stringify(user));
  }

  getLocalRefreshToken(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    return userData?.refreshToken;
  }

}
export default new AuthService();
