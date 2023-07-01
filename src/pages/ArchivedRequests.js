import React from "react";

// components
import Layout from "../components/navigation/Layout";
import ArchivedRequestsTable from "../components/archivedRequests/ArchivedRequestsTable";

const Analytics = () => {

    return (
        <Layout>
            <div className="page-header">
                <h1>Archived requests</h1>
                <h5>This is a list of all archived requests.</h5>
            </div>
            <ArchivedRequestsTable/>
        </Layout>
    );
};

export default Analytics;
