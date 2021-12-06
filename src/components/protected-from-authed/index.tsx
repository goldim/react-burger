import { FC, ReactNode, useLayoutEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../services/auth";

interface IProtectedFromAuthedRouteProps {
    children: ReactNode
}

const ProtectedFromAuthedRoute: FC<IProtectedFromAuthedRouteProps> = ({children}) => {
    const {getUser, user} = useAuth();
    const [userLoaded, setUserLoaded] = useState(false);
  
    useLayoutEffect(() => {
        getUser().then(function() {
            setUserLoaded(true);
        });
        // eslint-disable-next-line
    }, []);

    if (!userLoaded){
        return null;
    }

    return (<>{ !user ? children: <Navigate to="/"/> }</>);
}

export default ProtectedFromAuthedRoute;