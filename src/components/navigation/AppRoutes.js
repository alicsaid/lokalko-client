import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

// components & pages
import Login from "../../pages/Login"
import Dashboard from "../../pages/Dashboard"
import Requests from "../../pages/Requests"
import ArchivedRequests from "../../pages/ArchivedRequests";
import Users from "../../pages/Users"
import Services from "../../pages/Services"
import Settings from "../../pages/Settings";
import ProtectedRoutes from "../navigation/ProtectedRoutes";

const AppRoutes = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/requests" element={<Requests/>}/>
                    <Route path="/archived-requests" element={<ArchivedRequests/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;