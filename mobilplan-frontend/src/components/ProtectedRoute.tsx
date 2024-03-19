import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../features/auth/authSlice";

export const ProtectedRoute = ({children}: { children: React.ReactNode; }) => {
    const authenticated = useSelector(selectIsAuthenticated);
    return authenticated
        ? <>{children}</>
        : <Navigate to="/login"/>;
}