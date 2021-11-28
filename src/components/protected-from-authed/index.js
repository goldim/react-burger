import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { getProfile } from "../../services/middleware/auth";

const ProtectedFromAuthedRoute = (props) => {
    const navigate = useNavigate();
    const name = useSelector(store => store.authReducer.currentUser.name);
  
    const loaded = useSelector(store => store.authReducer.currentUser.loaded);
    const authed = name !== "";
    
    const reduxDispatch = useDispatch();
  
    const init = () => {
      reduxDispatch(getProfile());
    };

    const location = useLocation();
  
    useEffect(() => {
        init();
    }, []);

    const checkAuthed = useCallback((loaded, authed) => {
        if (loaded && authed){
            if (location.state && location.state.resetPassed){
                navigate("/profile");
            }
            else {
                navigate(-1);
            }
        }
    }, [location]);
  
    useEffect(() => {
        checkAuthed(loaded, authed);
    }, [authed, loaded]);

    return (
        <>
            { 
                loaded && !authed ? props.children: "" 
            }
        </>
    );
}

export default ProtectedFromAuthedRoute;