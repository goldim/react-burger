import { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../services/auth";

const ProtectedRoute = (props) => {
    const {getUser, user} = useAuth();
    const [userLoaded, setUserLoaded] = useState(false);

    useLayoutEffect(() => {
        getUser().then(function(){
            setUserLoaded(true);
        });
        // eslint-disable-next-line
    }, []);

    if (!userLoaded){
        return null;
    }
    return (<>{ user ? props.children: <Navigate to={{pathname: "/login"}}/> }</>);
}

export default ProtectedRoute;