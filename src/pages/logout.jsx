import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/middleware/auth";

const LogoutPage = () => {
    const reduxDispatch = useDispatch();
    const logoutSuccess = useSelector(store => store.authReducer.logoutSuccess);

    useEffect(() => {
        reduxDispatch(logout());
    }, [reduxDispatch]);

    useEffect(() => {
        if (logoutSuccess){
            // navigate("/login", {state: {logoutPassed: true}});
        }
    }, [logoutSuccess]);

    return (
        <p>Выход...</p>
    );
}

export default LogoutPage;