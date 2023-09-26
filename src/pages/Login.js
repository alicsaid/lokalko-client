// Login.js
import React, { useEffect, useState } from "react";
import "../components/login/Login.css";

// components
import LoginForm from "../components/login/LoginForm";

const Login = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);

    useEffect(() => {
        // Postavite showLoginForm na true nakon pulsirajućeg efekta
        const timer = setTimeout(() => {
            setShowLoginForm(true);
        }, 4500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="login-page">
            {!showLoginForm ? (
                <div className="logo-container">
                    <h1 className="logo">LOKALKO</h1>
                </div>
            ) : (
                <div className="logo-container">
                    <LoginForm className="login-form" />
                </div>
            )}
        </div>
    );
};

export default Login;
