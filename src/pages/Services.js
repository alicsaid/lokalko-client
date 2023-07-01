import React from "react";

// components
import Layout from "../components/navigation/Layout";
import ServicesTable from "../components/services/ServicesTable"

const Services = () => {
    return (
        <Layout>
            <div className="page-header">
                <h1>Services</h1>
                <h5>This is a list of all available services.</h5>
            </div>
            <ServicesTable/>
        </Layout>
    );
};

export default Services;
