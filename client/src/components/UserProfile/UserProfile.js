import React from 'react'
import './UserProfile.css'

export default function UserProfile() {


  return (
    <div>
        <h2 className="center">Modify personal information</h2>
        <div className="infoContainer">
        <label className="infoItem" >Firstname: </label>
        <label className="infoItem">Lastname: </label>
        <label className="infoItem">Address: </label>
        <label className="infoItem">Phonenumber: </label>
        </div>

    </div>
  )
}
