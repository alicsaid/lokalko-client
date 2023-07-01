import React from "react";

// components
import Layout from "../components/navigation/Layout";
import DashboardCards from "../components/dashboard/DashboardCards";

const Dashboard = () => {
    return (
        <Layout>
            <div className="page-header">
                <h1>Dashboard</h1>
                <h5>Welcome to ADMIN dashboard.</h5>
            </div>
            <DashboardCards/>
        </Layout>
    );
};

export default Dashboard;
