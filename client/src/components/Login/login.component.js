import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import './login.styles.css';


export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    let currentUser = AuthService.getCurrentUser();

    this.state = {
      currentUser: currentUser,
      username: '',
      password: '',
      loading: false,
      message: "",
      userMenuClass: ''
    };
  }

  toggleMenu(e){
    // Toggle menu only when parent elements are clicked
    if(e.target.classList.contains('user') || e.target.classList.contains('user__name')){
      if(this.state.userMenuClass === ''){
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
          currentUser: AuthService.getCurrentUser()
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
      loading: false
    });
  }

  getAuthorizedTemplate(){
    // Default templates if user type is customer
    let addRestaurantTemplate = '';
    let browseRestaurantTemplate = (
      <li>
        <Link to="/restaurants">Browse restaurant</Link>
      </li>
    );
    let shoppingCartTemplate = (
      <li>
        <Link to="/user/shopping-cart">Shopping cart</Link>
      </li>
    );
    // Templates if user type is restaurant owner
    if(this.state.currentUser.isOwner === 1){
      addRestaurantTemplate = (
        <li>
          <Link to="/user/add-restaurant">Add restaurant</Link>
        </li>
      );
      browseRestaurantTemplate = (
        <li>
          <Link to="/restaurants">Edit restaurant</Link>
        </li>
      )
      shoppingCartTemplate = '';
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
            <Link to="/user/profile">Profile</Link>

          </li>
          {addRestaurantTemplate}
          {browseRestaurantTemplate}
          {shoppingCartTemplate}
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
            placeholder="Username"
          />
          <input
            type="password"
            className="login__form-item"
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
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
    if(this.state.currentUser){
      return this.getAuthorizedTemplate();
    } else {
      return this.getUnauthorizedTemplate();
    }
  }
}
