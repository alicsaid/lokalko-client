import React, { useState, useEffect } from "react";
import {
    Button,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
} from "@mui/material";
import { Info, Delete, Edit, Add } from "@mui/icons-material";
import axios from "axios";

// Components
import ServiceDetailsModal from "./ServiceDetailsModal";
import ServiceDeleteModal from "./ServiceDeleteModal";
import ServiceEditModal from "./ServiceEditModal";
import ServiceAddModal from "./ServiceAddModal";

// CSS
import "./Services.css";

function ServicesTable() {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCloseModals = () => {
        setShowDetailsModal(false);
        setShowDeleteModal(false);
        setShowEditModal(false);
        setShowAddModal(false);
    };

    const handleOpenDetailsModal = (service) => {
        setSelectedService(service);
        setShowDetailsModal(true);
    };

    const handleOpenDeleteModal = (service) => {
        setSelectedService(service);
        setShowDeleteModal(true);
    };

    const handleOpenEditModal = (service) => {
        setSelectedService(service);
        setShowEditModal(true);
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleDelete = (serviceId) => {
        // Handle delete logic here
        console.log("Deleting service with ID:", serviceId);
        handleCloseModals();
    };

    const handleSave = (updatedService) => {
        // Handle save logic here
        console.log("Saving updated service:", updatedService);
        handleCloseModals();
    };

    const handleAddService = (newService) => {
        // Handle add service logic here
        console.log("Adding new service:", newService);
        handleCloseModals();
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const columns = [
        { field: "index", headerName: "No.", width: 100 },
        { field: "service", headerName: "Service", width: 350 },
        { field: "city", headerName: "City", width: 150 },
        { field: "actions", headerName: "Actions", width: 450 },
    ];

    useEffect(() => {
        axios
            .get("/admin/services")
            .then((response) => {
                const services = response.data.services.map((service, index) => ({
                    ...service,
                    index: index + 1,
                }));
                setRows(services);
                setFilteredRows(services);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredRows(rows);
        } else {
            const filteredData = rows.filter((row) =>
                row.service.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRows(filteredData);
        }
    }, [searchTerm, rows]);

    return (
        <div>
            <div className="table-header">
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddModal}
                >
                    <Add /> Add Service
                </Button>
            </div>

            <div className="table-container">
                <TableContainer>
                    <Table className="services-table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    align="center"
                                    width={column.width}
                                    style={{ fontWeight: "600" }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((row) => (
                            <TableRow key={row.index}>
                                <TableCell align="center">{row.index}.</TableCell>
                                <TableCell align="center">{row.service}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="primary"
                                        size="small"
                                        onClick={() => handleOpenDetailsModal(row)}
                                        style={{ color: "#3B9AFF" }}
                                    >
                                        <Info />
                                    </Button>

                                    <Button
                                        variant="warning"
                                        size="small"
                                        onClick={() => handleOpenEditModal(row)}
                                        style={{ color: "#FFC107" }}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="small"
                                        onClick={() => handleOpenDeleteModal(row)}
                                        style={{ color: "#DC3545" }}
                                    >
                                        <Delete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>

            <ServiceDetailsModal
                show={showDetailsModal}
                handleClose={handleCloseModals}
                service={selectedService}
            />

            <ServiceDeleteModal
                show={showDeleteModal}
                handleClose={handleCloseModals}
                handleDelete={handleDelete}
                service={selectedService}
            />

            <ServiceEditModal
                show={showEditModal}
                handleClose={handleCloseModals}
                handleSave={handleSave}
                service={selectedService}
            />

            <ServiceAddModal
                show={showAddModal}
                handleClose={handleCloseModals}
                handleAddService={handleAddService}
            />
        </div>
    );
}

export default ServicesTable;
