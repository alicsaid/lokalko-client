import React, {useState, useEffect} from "react";
import {Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {Info, Archive, Delete} from "@mui/icons-material";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// components
import RequestDetailsModal from "./RequestDetailsModal";
import RequestArchiveModal from "./RequestArchiveModal";
import RequestDeleteModal from "./RequestDeleteModal";

// CSS
import "./Requests.css";

function RequestsTable() {
    const [rows, setRows] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCloseModals = () => {
        setShowDetailsModal(false);
        setShowArchiveModal(false);
        setShowDeleteModal(false);
    };

    const handleOpenDetailsModal = (request) => {
        setSelectedRequest(request);
        setShowDetailsModal(true);
    };

    const handleOpenArchiveModal = (request) => {
        setSelectedRequest(request);
        setShowArchiveModal(true);
    };

    const handleOpenDeleteModal = (request) => {
        setSelectedRequest(request);
        setShowDeleteModal(true);
    };

    useEffect(() => {
        axios
            .get("/admin/requests")
            .then((response) => {
                const requests = response.data.requests.map((request, index) => ({
                    ...request,
                    index: index + 1,
                }));
                setRows(requests);
                //console.log(requests)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleArchive = (requestId) => {
        axios
            .patch(`/admin/requests/${requestId}/archive`)
            .then((response) => {
                console.log("Request archived:", requestId);
                setRows((prevRows) => prevRows.filter((row) => row.request_id !== requestId));
                toast.success('Request archived!');
            })
            .catch((error) => {
                console.error("Error archiving request:", error);
                toast.error('Error archiving request!');
            });

        handleCloseModals();
    };

    const handleDelete = (requestId) => {
        axios
            .delete(`/admin/requests/${requestId}/delete`)
            .then((response) => {
                console.log("Request deleted:", requestId);
                setRows((prevRows) => prevRows.filter((row) => row.request_id !== requestId));
                toast.success('Request deleted!');
            })
            .catch((error) => {
                console.error("Error deleting request:", error);
                toast.error('Error deleting request!');
            });

        handleCloseModals();
    };

    const handleSave = (updatedRequest) => {
        console.log("Saving updated request:", updatedRequest);

        const {request_id, category, service, severity, status} = updatedRequest;

        const data = {
            request_id,
            category,
            service,
            severity,
            status
        };

        axios
            .patch(`/admin/requests/${request_id}/update`, data)
            .then((response) => {
                console.log("Request updated:", response.data);

                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.request_id === request_id ? {...row, ...updatedRequest} : row
                    )
                );

                toast.success("Request updated!");
                handleCloseModals();
            })
            .catch((error) => {
                console.error("Error updating request:", error);
                toast.error("Error updating request!");
            });
    };

    const columns = [
        {field: "index", headerName: "No.", width: 80},
        {field: "title", headerName: "Title", width: 200},
        {field: "city", headerName: "City", width: 100},
        {field: "severity", headerName: "Severity", width: 120},
        {field: "assigned", headerName: "Assigned", width: 140},
        {field: "status", headerName: "Status", width: 140},
        {field: "actions", headerName: "Actions", width: 300},
    ];

    return (
        <div className="table-container">
            <TableContainer>
                <Table className="requests-table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.field} align="center" width={column.width}
                                           style={{fontWeight: "600"}}>
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No requests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <TableRow key={row.request_id}>
                                    <TableCell align="center">{row.index}.</TableCell>
                                    <TableCell align="center">{row.title}</TableCell>
                                    <TableCell align="center">{row.city}</TableCell>
                                    <TableCell align="center">
                                        <span className={`severity-${row.severity.toLowerCase()}`}>{row.severity}</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.service ? (
                                            <span style={{color: "#188130", fontWeight: "bold"}}>YES</span>
                                        ) : (
                                            <span style={{color: "#DC3545", fontWeight: "bold"}}>NO</span>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <span
                                            className={`status-${row.status.toLowerCase().replace(/\s/g, '-')}`}>{row.status}</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="primary"
                                            size="small"
                                            onClick={() => handleOpenDetailsModal(row)}
                                            style={{color: '#3B9AFF'}}
                                        >
                                            <Info/>
                                        </Button>
                                        <Button
                                            variant="warning"
                                            size="small"
                                            onClick={() => handleOpenArchiveModal(row)}
                                            style={{color: '#FFC415'}}
                                        >
                                            <Archive/>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="small"
                                            onClick={() => handleOpenDeleteModal(row)}
                                            style={{color: '#DC3545'}}
                                        >
                                            <Delete/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <RequestDetailsModal
                show={showDetailsModal}
                handleClose={handleCloseModals}
                handleSave={handleSave}
                request={selectedRequest}
            />

            <RequestArchiveModal
                show={showArchiveModal}
                handleClose={handleCloseModals}
                handleArchive={handleArchive}
                request={selectedRequest}
            />

            <RequestDeleteModal
                show={showDeleteModal}
                handleClose={handleCloseModals}
                handleDelete={handleDelete}
                request={selectedRequest}
            />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default RequestsTable;
