import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

const RequireAuth = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth === true ? children : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;