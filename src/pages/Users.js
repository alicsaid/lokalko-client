import React from "react";

// components
import Layout from "../components/navigation/Layout";
import UsersTable from "../components/users/UsersTable";

const Requests = () => {
    return (
        <Layout>
            <div className="page-header">
                <h1>Users</h1>
                <h5>This is a list of all registered users.</h5>
            </div>
            <UsersTable/>
        </Layout>
    );
};

export default Requests;
