import React from 'react';

export default function Menu (props) {

return (
    <div className="menuItem">
        <div><h1> {props.name }</h1></div>
        <div>Description: {props.description }</div>
        </div>
        )
}