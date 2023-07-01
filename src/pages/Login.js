import React from "react";
import "../components/login/Login.css"

// components
import LoginForm from "../components/login/LoginForm";

const Login = () => {
    return (
        <div className="login-page">
            <LoginForm/>
        </div>
    );
};

export default Login;
