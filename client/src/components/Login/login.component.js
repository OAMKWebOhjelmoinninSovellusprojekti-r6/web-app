import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import './login.styles.css';
import { useAuthDispatch, useAuthState } from "../../context/context.js";

export default function Login(){
  AuthService.autoLogout();

  const dispatch = useAuthDispatch()
  const currentUser = useAuthState();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [authenticatingUser, setAuthenticatingUser] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [UIMenuClass, setUIMenuClass] = useState('');

  useEffect(() => {
    setAuthenticatingUser(false);
  }, []);

  const inputEventUsername = (e) => {
    setUsername(e.target.value);
  }

  const inputEventPassword = (e) => {
    setPassword(e.target.value);
  }

  const userLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setAuthenticatingUser(true);
    AuthService.login(username, password)
      .then( result => {
        dispatch({ type: 'LOGIN', payload: result });
        setAuthenticatingUser(false);
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorMessage(resMessage);
        setAuthenticatingUser(false);
      });
  }

  const userLogout = () => {
    setUsername('');
    setPassword('');
    dispatch({type:'LOGOUT', payload: null})
    AuthService.logout();
  }

  const UIToggleMenu = (e) => {
    // Toggle menu only when parent elements are clicked
    if(e.target.classList.contains('user') || e.target.classList.contains('user__name')){
      if(UIMenuClass === ''){
        setUIMenuClass('active');
      } else {
        setUIMenuClass('');
      }
    }
  }

  const getAuthorizedTemplate = () => {
    // Default templates if user type is customer
    let addRestaurantTemplate = '';
    let browseRestaurantTemplate = (
      <li>
        <Link to="/">Browse restaurant</Link>
      </li>
    );
    let shoppingCartTemplate = (
      <li>
        <Link to="/user/cart">Shopping cart</Link>
      </li>
    );
    // Templates if user type is restaurant owner
    if(currentUser.isOwner === 1){
      addRestaurantTemplate = (
        <li>
          <Link to="/user/add-restaurant">Add restaurant</Link>
        </li>
      );
      browseRestaurantTemplate = (
        <li>
          <Link to="/">Edit restaurant</Link>
        </li>
      )
      shoppingCartTemplate = '';
    }
    return (
      <div className="user" onClick={UIToggleMenu}>
        <span className="user__name">{currentUser.firstName}</span>
        <ul className={'user__menu ' + UIMenuClass}>
          {addRestaurantTemplate}
          {browseRestaurantTemplate}
          {shoppingCartTemplate}
          <li>
            <Link to="/user/history">Order history</Link>
          </li>
          <li>
            <Link to="/" onClick={userLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    );
  }

  const getUnAuthorizedTemplate = () => {
    return (
      <form
        className="login"
        onSubmit={userLogin}
      >
          {errorMessage}
          <input
            type="text"
            className="login__form-item"
            name="username"
            onChange={inputEventUsername}
            placeholder="Username"
          />
          <input
            type="password"
            className="login__form-item"
            name="password"
            onChange={inputEventPassword}
            placeholder="Password"
          />
          <button
            className="login__form-item"
            disabled={authenticatingUser}
          >
            <span>Sign in</span>
          </button>
         <Link to="/register">Sign up</Link>
      </form>
    );
  }

  if(currentUser){
    return getAuthorizedTemplate();
  } else {
    return getUnAuthorizedTemplate();
  }
}