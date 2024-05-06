import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import Cookies from 'js-cookie'


const ProtectedRoutes=()=>{
    const adminCookie = Cookies.get("admin");

    return adminCookie ? <Outlet/> : <Navigate to="/AdminLogin"/>
}

export default ProtectedRoutes