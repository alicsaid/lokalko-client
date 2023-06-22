import React from "react";

// components
import Layout from "../components/navigation/Layout";
import SettingsCards from "../components/settings/SettingsCards";

const Settings = () => {

    return (
        <Layout>
            <div className="page-header">
                <h1>Settings</h1>
                <h5>Here you can modify settings of the aplication.</h5>
            </div>
            <SettingsCards />
        </Layout>
    );
};

export default Settings;
