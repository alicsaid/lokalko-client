import React, {useState, useEffect} from "react";
import {Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {Info, Delete} from "@mui/icons-material";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// components
import ArchivedRequestDetailsModal from "./ArchivedRequestDetailsModal";
import ArchivedRequestDeleteModal from "./ArchivedRequestDeleteModal";


// CSS
import "../archivedRequests/ArchivedRequests.css";

function ArchivedRequestsTable() {
    const [rows, setRows] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCloseModals = () => {
        setShowDetailsModal(false);
        setShowDeleteModal(false);
    };

    const handleOpenDetailsModal = (request) => {
        setSelectedRequest(request);
        setShowDetailsModal(true);
    };

    const handleOpenDeleteModal = (request) => {
        setSelectedRequest(request);
        setShowDeleteModal(true);
    };

    useEffect(() => {
        axios
            .get("/admin/archived-requests")
            .then((response) => {
                const archivedRequests = response.data.archivedRequests.map((request, index) => ({
                    ...request,
                    index: index + 1,
                }));
                setRows(archivedRequests);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = (requestId) => {
        axios
            .delete(`/admin/archived-requests/${requestId}/delete`)
            .then((response) => {
                console.log("Archived request deleted:", requestId);
                setRows((prevRows) => prevRows.filter((row) => row.request_id !== requestId));
                toast.success('Archived request deleted!');
            })
            .catch((error) => {
                console.error("Error deleting archived request:", error);
                toast.error('Error deleting archived request!');
            });

        handleCloseModals();
    };

    const columns = [
        {field: "index", headerName: "No.", width: 80},
        {field: "title", headerName: "Title", width: 200},
        {field: "city", headerName: "City", width: 200},
        {field: "severity", headerName: "Severity", width: 150},
        {field: "status", headerName: "Status", width: 150},
        {field: "actions", headerName: "Actions", width: 300},
    ];

    return (
        <div className="table-container">
            <TableContainer>
                <Table className="archived-requests-table">
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
                                <TableCell align="center" colSpan={columns.length}>
                                    No archived requests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <TableRow key={row.archived_request_id}>
                                    <TableCell align="center">{row.index}.</TableCell>
                                    <TableCell align="center">{row.title}</TableCell>
                                    <TableCell align="center">{row.city}</TableCell>
                                    <TableCell align="center">
          <span className={`severity-${row.severity.toLowerCase()}`}>
            {row.severity}
          </span>
                                    </TableCell>
                                    <TableCell align="center">
          <span className={`status-${row.status.toLowerCase().replace(/\s/g, '-')}`}>
            {row.status}
          </span>
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

            <ArchivedRequestDetailsModal
                show={showDetailsModal}
                handleClose={handleCloseModals}
                request={selectedRequest}
            />

            <ArchivedRequestDeleteModal
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

export default ArchivedRequestsTable;
