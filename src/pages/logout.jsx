import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../services/middleware/auth";

const LogoutPage = () => {
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(store => store.authReducer.currentUser.name);

    useLayoutEffect(() => {
        reduxDispatch(logout());
    }, [reduxDispatch]);

    useLayoutEffect(() => {
        if (name === ""){
            navigate("/login", {replace: true});
        }
    }, [name, navigate]);

    return (
        <p>Выход...</p>
    );
}

export default LogoutPage;