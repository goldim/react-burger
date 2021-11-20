import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = (props) => {
    const name = useSelector(store => store.authReducer.currentUser.name);
    const isAuthed = name !== "";

    return (
        <>
            { isAuthed ? props.children: <Navigate to="/login"/> }
            
        </>
    );
}

export default ProtectedRoute;