import React from 'react'
import './Search.css'

export default function Search(props) {
  return (
    <div className="search"><input type="text" value ={ props.searchValue }placeholder="Search by name" onChange={ props.onSearchChange }/></div>
  )
}