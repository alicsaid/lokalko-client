import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap";
import {Button, TextField, FormControl, InputLabel, Select, MenuItem, Box} from "@mui/material";
import axios from "axios";

function RequestDetailsModal({show, handleClose, handleSave, request}) {
    const [services, setServices] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [severities, setSeverities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [service, setService] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");

    //console.log("category:", category);

    useEffect(() => {
        axios
            .get("/admin/services")
            .then((response) => {
                const services = response.data.services.map((service) => ({
                    id: service.service_id,
                    service: service.service,
                }));
                setServices(services);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get("/admin/statuses")
            .then((response) => {
                const statuses = response.data.statuses.map((status) => ({
                    id: status.status_id,
                    status: status.status,
                }));
                setStatuses(statuses);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get("/admin/severities")
            .then((response) => {
                const severities = response.data.severities.map((severity) => ({
                    id: severity.severity_id,
                    severity: severity.severity,
                }));
                setSeverities(severities);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get("/admin/categories")
            .then((response) => {
                const categories = response.data.categories.map((category) => ({
                    id: category.category_id,
                    category: category.category,
                }));
                setCategories(categories);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (request) {
            setCategory(request.category || "");
            setService(request.service || "");
            setSeverity(request.severity || "");
            setStatus(request.status || "");
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
                                <MenuItem key={category.id} value={category.category}>
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
                                <MenuItem key={service.id} value={service.service}>
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
                                <MenuItem key={severity.id} value={severity.severity}>
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
                                <MenuItem key={status.id} value={status.status}>
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
