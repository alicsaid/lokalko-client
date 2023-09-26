import React from "react";

// components
import Layout from "../components/navigation/Layout";
import RequestsTable from "../components/requests/RequestsTable";

const Requests = () => {
    return (
        <Layout>
            <div className="page-header">
                <h1>All Reports</h1>
                <h5>This is a list of all issues users reported.</h5>
            </div>
            <RequestsTable/>
        </Layout>
    );
};

export default Requests;
