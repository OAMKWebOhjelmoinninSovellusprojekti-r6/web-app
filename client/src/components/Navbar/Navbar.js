import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className="navBar">
        <Link to="/restaurants"><div className="navBarItem">Restaurants</div></Link>
        <Link to="/myprofile"><div className="navBarItem">MyProfile</div></Link>
        <Link to="/cart"><div className="navBarItem">ShoppingCart</div></Link>
        <Link to="/history"><div className="navBarItem">OrderHistory</div></Link>
        <div className="navBarItem">LogOut</div>
    </div>
  )
}