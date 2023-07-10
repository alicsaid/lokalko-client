import React from "react";

// components
import Layout from "../components/navigation/Layout";
import Categories from "../components/settings/categories/Categories";

const Settings = () => {

    return (
        <Layout>
            <div className="page-header">
                <h1>Settings</h1>
                <h5>Here you can modify settings of the aplication.</h5>
            </div>
            <Categories/>
        </Layout>
    );
};

export default Settings;
