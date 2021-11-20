import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { logout } from "../services/middleware/auth";

const LogoutPage = () => {
    const reduxDispatch = useDispatch();

    useLayoutEffect(() => {
        reduxDispatch(logout());
    }, []);

    return (
        <Navigate to="/login"/>
    );
}

export default LogoutPage;