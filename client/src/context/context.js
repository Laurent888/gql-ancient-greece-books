import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

import { types } from "./actionTypes";

const Context = createContext();

const INITIAL_STATE = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decoded = jwtDecode(localStorage.getItem("token"));

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  }

  INITIAL_STATE.user = decoded.user;
}

const stateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  const loginContext = async (token) => {
    localStorage.setItem("token", token);
    const decoded = await jwtDecode(token);
    dispatch({ type: types.LOGIN_USER, payload: decoded.user });
  };

  const logoutContext = () => {
    localStorage.removeItem("token");
    dispatch({ type: types.LOGOUT });
  };

  return (
    <Context.Provider value={{ ...state, loginContext, logoutContext }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
