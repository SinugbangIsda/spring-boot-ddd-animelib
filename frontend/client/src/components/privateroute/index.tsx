
 

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../../context/global";
// import jwt_decode from "jwt-decode";
// import { getJwt } from "../../utils";

const PrivateRoute = ({ children }: any) => {
    const { data, dispatch } = useContext(GlobalContext);
    const { userId } = data

    const auth = () => {
        if (userId === null) return false;
        if (userId !== null) {
        //   const { token } = JSON.parse(localStorage.getItem("user"));
        //   const expiresIn = jwt_decode(token).exp * 1000;
        //   const currentDate = new Date();
        //   if (expiresIn < currentDate.getTime()) {
        //     dispatch({ type: "LOGOUT" });
        //     return false;
        //   }
        }
        return true;
    };

    return auth() ? children : <Navigate to = "/signin" />
}



export default PrivateRoute;