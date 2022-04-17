import React, { useReducer } from "react";
 
let user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
 
export const initialState = null || user;
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};