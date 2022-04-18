import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Login from '../Login/login.component';

export default function Navbar() {
  return (
    <header className="navbar">
        <div className="navbar__title-container">
          <Link to="/">Food Master</Link>
        </div>
        <div className="navbar__login-container">
          <Login></Login>
        </div>
    </header>
  )
}