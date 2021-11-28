import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getProfile } from "../../services/middleware/auth";

const ProtectedRoute = (props) => {
    const name = useSelector(store => store.authReducer.currentUser.name);
    const loaded = useSelector(store => store.authReducer.currentUser.loaded);
    const authed = name !== "";

    const reduxDispatch = useDispatch();

    const init = useCallback(() => {
        reduxDispatch(getProfile());
    }, [reduxDispatch]);

    useEffect(() => {
        init();
    }, [init]);

    const navigate = useNavigate();

    useEffect(() => {
        if (loaded && !authed){
            navigate("/login");
        }
        
    }, [authed, loaded, navigate]);

    return (
        <>
            { 
                loaded && authed ? props.children: "" 
            }
        </>
    );
}

export default ProtectedRoute;