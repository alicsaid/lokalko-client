import React, {useState, useEffect} from "react";
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
import {Info, Delete, Edit, Add} from "@mui/icons-material";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

// Components
import ServiceDetailsModal from "./ServiceDetailsModal";
import ServiceDeleteModal from "./ServiceDeleteModal";
import ServiceEditModal from "./ServiceEditModal";
import ServiceAddModal from "./ServiceAddModal";

// CSS
import "./Services.css";
import {useNavigate} from "react-router-dom";

function ServicesTable() {
    const navigate = useNavigate()
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
        axios
            .delete(`/admin/services/${serviceId}/delete/`,
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
            )
            .then((response) => {
                console.log("Service deleted:", response.data);
                setRows((prevRows) => prevRows.filter((row) => row.service_id !== serviceId));
                toast.success('Service deleted!');
                handleCloseModals();
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error("Error deleting service:", error);
                toast.error('Error deleting service!');
            });
    };

    const handleAddService = (newService) => {

        console.log("Adding new service:", newService);

        const {service, address, city, telephone} = newService;

        const data = {
            service,
            address,
            city,
            telephone
        };

        axios
            .post("/admin/services/create/"
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
                , data)
            .then((response) => {
                console.log("Service added:", response.data);
                const newIndex = rows.length + 1;

                const newServiceWithIndex = {...newService, index: newIndex};
                setRows((prevRows) => [...prevRows, newServiceWithIndex]);
                toast.success('Service created!');
                handleCloseModals();
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error("Error adding service:", error);
                toast.error('Error creating service!');
            });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        axios
            .get("/admin/services",
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
            )
            .then((response) => {
                const services = response.data.services.map((service, index) => ({
                    ...service,
                    index: index + 1,
                }));
                //console.log(response.data)
                setRows(services);
                setFilteredRows(services);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
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

    const columns = [
        {field: "index", headerName: "No.", width: 130},
        {field: "service", headerName: "Service", width: 350},
        {field: "city", headerName: "City", width: 150},
        {field: "actions", headerName: "Actions", width: 450},
    ];

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
                    <Add/> Add Service
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
                                        style={{fontWeight: "600"}}
                                    >
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length === 0 ? (
                                <TableRow>
                                    <TableCell align="center" colSpan={columns.length}>
                                        No services found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRows.map((row) => (
                                    <TableRow key={row.index}>
                                        <TableCell align="center">{row.index}.</TableCell>
                                        <TableCell align="center">{row.service}</TableCell>
                                        <TableCell align="center">{row.city}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="primary"
                                                size="small"
                                                onClick={() => handleOpenDetailsModal(row)}
                                                style={{color: "#3B9AFF"}}
                                            >
                                                <Info/>
                                            </Button>
                                            <Button
                                                variant="warning"
                                                size="small"
                                                onClick={() => handleOpenEditModal(row)}
                                                style={{color: "#FFC107"}}
                                            >
                                                <Edit/>
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="small"
                                                onClick={() => handleOpenDeleteModal(row)}
                                                style={{color: "#DC3545"}}
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
                setRows={setRows}
                service={selectedService}
            />

            <ServiceAddModal
                show={showAddModal}
                handleClose={handleCloseModals}
                handleAddService={handleAddService}
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

export default ServicesTable;
