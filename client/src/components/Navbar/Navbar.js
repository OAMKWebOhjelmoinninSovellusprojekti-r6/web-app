import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navBar">
        <Link to="/restaurant"><div className="navBarItem">Restaurants</div></Link>
        <div className="navBarItem">MyProfile</div>
        <Link to="/cart"><div className="navBarItem">ShoppingCart</div></Link>
        <div className="navBarItem">OrderHistory</div>
        <div className="navBarItem">LogOut</div>
    </div>
  )
}