import {Navigate, Outlet} from "react-router-dom";
import {FC, JSX} from "react";

const ProtectedRoutes: FC = (): JSX.Element => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
        return <Navigate to="/registration" replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoutes;
