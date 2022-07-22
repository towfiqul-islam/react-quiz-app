import React, { useReducer } from "react";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";

import { Types } from "./Types";

const AppState = (props) => {
  const initialState = {
    access: "",
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const login = (user, navigate) => {
    const {username, password} = user
    if (username === "admin" && password === "admin") {
      localStorage.setItem("access", "admin");
      dispatch({
        type: Types.LOGIN,
        payload: "admin",
      });
      navigate("/questions");
    } else {
      localStorage.setItem("access", "user");

      dispatch({
        type: Types.LOGIN,
        payload: "user",
      });
      navigate("/answers");
    }
  };

  const getAccess = () => {
    const access = localStorage.getItem('access') || '';
    dispatch({
      type: Types.LOGIN,
      payload: access
    })
  }

  return (
    <AppContext.Provider
      value={{
        access: state.access,
        login,
        getAccess
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
