import React from "react";

// components
import Navigation from "./Navigation";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Navigation />
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
