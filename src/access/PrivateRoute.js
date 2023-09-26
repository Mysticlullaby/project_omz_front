import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuth, RouteComponent }) => {
  const isLogin = localStorage.getItem("isLogin");
  console.log(isLogin);

  if (isAuth && isLogin) {
    return <RouteComponent />;
  } else if (isAuth && !isLogin) {
    return <Navigate to="login" />;
  } else {
    return <RouteComponent />;
  }
};

export default PrivateRoute;
