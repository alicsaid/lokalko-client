import React, {useState, useEffect} from "react";
import {Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {Info, Archive, Delete} from "@mui/icons-material";
import axios from "axios";

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

    const handleArchive = (requestId) => {
        // Handle archive logic here
        console.log("Archiving request with ID:", requestId);
        handleCloseModals();
    };

    const handleDelete = (requestId) => {
        // Handle delete logic here
        console.log("Deleting request with ID:", requestId);
        handleCloseModals();
    };

    const columns = [
        {field: "index", headerName: "No.", width: 80},
        {field: "title", headerName: "Title", width: 200},
        {field: "city", headerName: "City", width: 100},
        {field: "severity", headerName: "Severity", width: 120},
        {field: "assigned", headerName: "Assigned", width: 120},
        {field: "status", headerName: "Status", width: 120},
        {field: "actions", headerName: "Actions", width: 300},
    ];

    useEffect(() => {
        axios
            .get("/admin/requests")
            .then((response) => {
                const requests = response.data.requests.map((request, index) => ({
                    ...request,
                    index: index + 1,
                }));
                setRows(requests);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
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
                        {rows.map((row) => (
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <RequestDetailsModal
                show={showDetailsModal}
                handleClose={handleCloseModals}
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
        </div>
    );
}

export default RequestsTable;
