import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../services/middleware/auth";

const LogoutPage = () => {
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();
    const logoutSuccess = useSelector(store => store.authReducer.logoutSuccess);

    useEffect(() => {
        console.log("logoutstart");
        reduxDispatch(logout());
    }, []);

    useEffect(() => {
        console.log("LOGOUT", logoutSuccess);
        if (logoutSuccess){
            // navigate("/login", {state: {logoutPassed: true}});
        }
    }, [logoutSuccess]);

    return (
        <p>Выход...</p>
    );
}

export default LogoutPage;