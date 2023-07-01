import React, {useState, useEffect} from "react";
import {Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {Info, Delete} from "@mui/icons-material";
import axios from "axios";

// components
import ArchivedRequestDetailsModal from "./ArchivedRequestDetailsModal";
import ArchivedRequestDeleteModal from "./ArchivedRequestDeleteModal";

// CSS
import "../archivedRequests/ArchivedRequests.css";

function ArchivedRequestsTable() {
    const [rows, setRows] = useState([]);
    const [selectedArchivedRequest, setSelectedArchivedRequest] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCloseModals = () => {
        setShowDetailsModal(false);
        setShowDeleteModal(false);
    };

    const handleOpenDetailsModal = (archivedRequest) => {
        setSelectedArchivedRequest(archivedRequest);
        setShowDetailsModal(true);
    };

    const handleOpenDeleteModal = (archivedRequest) => {
        setSelectedArchivedRequest(archivedRequest);
        setShowDeleteModal(true);
    };

    const handleDelete = (archivedRequestId) => {
        // Handle delete logic here
        console.log("Deleting archived request with ID:", archivedRequestId);
        handleCloseModals();
    };

    const columns = [
        {field: "index", headerName: "No.", width: 80},
        {field: "title", headerName: "Title", width: 200},
        {field: "city", headerName: "City", width: 100},
        {field: "severity", headerName: "Severity", width: 120},
        {field: "status", headerName: "Status", width: 120},
        {field: "actions", headerName: "Actions", width: 300},
    ];

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

    return (
        <div>
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
                        {rows.map((row) => (
                            <TableRow key={row.archived_request_id}>
                                <TableCell align="center">{row.index}.</TableCell>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">
                                    <span className={`severity-${row.severity.toLowerCase()}`}>{row.severity}</span>
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

            <ArchivedRequestDetailsModal
                show={showDetailsModal}
                handleClose={handleCloseModals}
                archivedRequest={selectedArchivedRequest}
            />

            <ArchivedRequestDeleteModal
                show={showDeleteModal}
                handleClose={handleCloseModals}
                handleDelete={handleDelete}
                archivedRequest={selectedArchivedRequest}
            />
        </div>
    );
}

export default ArchivedRequestsTable;
