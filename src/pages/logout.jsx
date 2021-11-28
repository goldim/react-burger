import { useLayoutEffect } from "react";
import { useAuth } from "../services/auth";
import { Navigate } from 'react-router-dom';

const LogoutPage = () => {
    const {user, signOut} = useAuth();

    useLayoutEffect(() => {
        signOut().then(function(){});
        // eslint-disable-next-line
    }, []);

    return (<>{ user ? (<p>Выход...</p>) : <Navigate to="/login"/>}</>);
}

export default LogoutPage;