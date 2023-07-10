import {Navigate} from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoutes;