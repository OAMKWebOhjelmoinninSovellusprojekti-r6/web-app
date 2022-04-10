import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import './login.styles.css';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    let isLoggedIn = false;
    let currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
    if(currentUser != null){
      isLoggedIn = true;
    }

    this.state = {
      currentUser: currentUser,
      username: '',
      password: '',
      loading: false,
      message: "",
      isLoggedIn: isLoggedIn,
      userMenuClass: ''
    };
  }

  toggleMenu(e){
    // Toggle menu only when parent elements are clicked
    if(e.target.classList.contains('user') || e.target.classList.contains('user__name')){
      if(this.state.userMenuClass == ''){
        this.setState({
          userMenuClass: 'active'
        })
      } else {
        this.setState({
          userMenuClass: ''
        })
      }
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  userLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    AuthService.login(this.state.username, this.state.password)
      .then( result => {
        console.log(result);
        this.setState({
          currentUser: AuthService.getCurrentUser(),
          isLoggedIn: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage
        });
      });
  }

  userLogout(){
    AuthService.logout();
    this.setState({
      currentUser: null,
      username: '',
      password: '',
      isLoggedIn: false,
      loading: false
    });
  }

  getAuthorizedTemplate(){
    let editRestaurants = '';
    if(this.state.isOwner == 1){
      editRestaurants = <li>
        <Link to="/">Edit restaurants</Link>
      </li>;
    }
    return (
      <div className="user" onClick={this.toggleMenu}>
        <span className="user__name">{this.state.currentUser.firstName}</span>
        <ul className={'user__menu ' + this.state.userMenuClass}>
          <li onClick={this.test}>
            Proffile
          </li>
          {editRestaurants}
          <li>
            <Link to="/cart">Shopping cart</Link>
          </li>
          <li>
            <Link to="/history">Order history</Link>
          </li>
          <li>
            <Link to="/" onClick={this.userLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    );
  }

  getUnauthorizedTemplate(){
    return (
      <form
        className="login"
        onSubmit={this.userLogin}
        ref={c => {
          this.form = c;
        }}
      >
          {this.state.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {this.state.message}
              </div>
            </div>
          )}
          <input
            type="text"
            className="login__form-item"
            name="username"
            value={this.state.username}
            onChange={this.onChangeUsername}
            validations={[required]}
            placeholder="Username"
          />
          <input
            type="password"
            className="login__form-item"
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            validations={[required]}
            placeholder="Password"
          />
          <button
            className="login__form-item"
            disabled={this.state.loading}
          >
            <span>Sign in</span>
          </button>
         <Link to="/register"  >Sign up</Link>
      </form>
    );
  }

  render() {
    if(this.state.isLoggedIn){
      return this.getAuthorizedTemplate();
    } else {
      return this.getUnauthorizedTemplate();
    }
  }
}
