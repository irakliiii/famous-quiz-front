import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { AdminAuthContext } from "../../context/AdminAuthContext";

export const Admin = () => {
    const navigate = useNavigate();
    const authContext = useContext(AdminAuthContext);
    console.info(authContext);
    useEffect(() => {if (!authContext.isAuthenticated) navigate('/admin/auth')}, [authContext]);

    return <div className="content"><Outlet /></div>
}