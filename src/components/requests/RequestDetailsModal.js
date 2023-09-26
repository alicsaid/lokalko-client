import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap";
import {Button, TextField, FormControl, InputLabel, Select, MenuItem, Box} from "@mui/material";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function RequestDetailsModal({show, handleClose, setRows, request}) {
    const navigate = useNavigate()
    const [services, setServices] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [severities, setSeverities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [service, setService] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");

    console.log("request:", request);

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
                const services = response.data.services.map((service) => ({
                    id: service.service_id,
                    service: service.service,
                }));
                setServices(services);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error(error);
            });

        axios
            .get("/admin/statuses",
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
            )
            .then((response) => {
                const statuses = response.data.statuses.map((status) => ({
                    id: status.status_id,
                    status: status.status,
                }));
                setStatuses(statuses);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error(error);
            });

        axios
            .get("/admin/severities",
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
            )
            .then((response) => {
                const severities = response.data.severities.map((severity) => ({
                    id: severity.severity_id,
                    severity: severity.severity,
                }));
                setSeverities(severities);
                console.log(severities);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error(error);
            });

        axios
            .get("/admin/categories",
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
            )
            .then((response) => {
                const categories = response.data.categories.map((category) => ({
                    id: category.category_id,
                    category: category.category,
                }));
                setCategories(categories);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (request) {
            setCategory(request.category_id || "");
            setService(request.service_id || "");
            setSeverity(request.severity_id || "");
            setStatus(request.status_id || "");
        }
    }, [request]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleServiceChange = (event) => {
        setService(event.target.value);
    };

    const handleSeverityChange = (event) => {
        setSeverity(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const getStatusById = (statusId) =>
        statuses.find(({id}) => id === statusId).status;

    const getSeverityById = (severityId) =>
        severities.find(({id}) => id === severityId).severity;

    const getCategoryById = (categoryId) =>
        categories.find(({id}) => id === categoryId).category;

    const getServiceById = (serviceId) =>
        services.find(({id}) => id === serviceId).service;

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
            .patch(`/admin/requests/${request_id}/update`
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
                , data)
            .then((response) => {
                console.log("Request updated:", response.data);

                const adjustedRow = {
                    request_id,
                    ...data,
                    status_id: status,
                    status: getStatusById(status),
                    severity_id: severity,
                    severity: getSeverityById(severity),
                    category_id: category,
                    category: getCategoryById(category),
                    service_id: service,
                    service: getServiceById(service)
                };

                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.request_id === request_id ? {...row, ...adjustedRow} : row
                    )
                );

                toast.success("Request updated!");
                handleClose();
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error("Error updating request:", error);
                toast.error("Error updating request!");
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedRequest = {
            ...request,
            category: category,
            service: service,
            severity: severity,
            status: status,
        };
        handleSave(updatedRequest);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Request Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box mb={2}>
                    <TextField
                        label="Title"
                        value={request?.title}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Description"
                        value={request?.description}
                        readOnly
                        multiline
                        rows={3}
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Date reported"
                        value={request?.date}
                        readOnly
                        fullWidth/>
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Time reported"
                        value={request?.time}
                        readOnly
                        fullWidth/>
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Address"
                        value={request?.address}
                        readOnly
                        fullWidth/>
                </Box>
                <Box mb={2}>
                    <TextField
                        label="City"
                        value={request?.city}
                        readOnly
                        fullWidth/>
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                        >
                            {categories?.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="service-label">Service</InputLabel>
                        <Select
                            labelId="service-label"
                            id="service-select"
                            value={service}
                            onChange={handleServiceChange}
                            label="Service"
                        >
                            <MenuItem value="">Select a service</MenuItem>
                            {services?.map((service) => (
                                <MenuItem key={service.id} value={service.id}>
                                    {service.service}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="severity-label">Severity</InputLabel>
                        <Select
                            labelId="severity-label"
                            id="severity-select"
                            value={severity}
                            onChange={handleSeverityChange}
                            label="Severity"
                        >
                            {severities?.map((severity) => (
                                <MenuItem key={severity.id} value={severity.id}>
                                    {severity.severity}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status-select"
                            value={status}
                            onChange={handleStatusChange}
                            label="Status"
                        >
                            {statuses?.map((status) => (
                                <MenuItem key={status.id} value={status.id}>
                                    {status.status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-buttons">
                    <Button className="close-button" variant="outlined" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="save-button" variant="outlined" onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default RequestDetailsModal;
