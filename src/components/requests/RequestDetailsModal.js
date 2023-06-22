import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import axios from "axios";

function RequestDetailsModal({ show, handleClose, request }) {
    const [services, setServices] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [severity, setSeverity] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("/admin/services")
            .then((response) => {
                const services = response.data.services.map((service) => ({
                    ...service,
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
            .get("/admin/severity")
            .then((response) => {
                const severity = response.data.severity.map((severity) => ({
                    id: severity.severity_id,
                    severity: severity.severity,
                }));
                setSeverity(severity);
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
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Time reported"
                        value={request?.time}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Address"
                        value={request?.address}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="City"
                        value={request?.city}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={request?.category}
                            onChange={(event) => console.log(event.target.value)}
                            label="Category"
                        >
                            {categories?.map((category) => (
                                <MenuItem key={category.service_id} value={category.category}>
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
                            value={request?.service}
                            onChange={(event) => console.log(event.target.value)}
                            label="Service"
                        >
                            <MenuItem value="">Select a service</MenuItem>
                            {services?.map((service) => (
                                <MenuItem key={service.service_id} value={service.service}>
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
                            value={request?.severity}
                            onChange={(event) => console.log(event.target.value)}
                            label="Severity"
                        >
                            {severity?.map((severity) => (
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
                            value={request?.status}
                            onChange={(event) => console.log(event.target.value)}
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
                <Button variant="success" onClick={handleClose}>
                    Save
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RequestDetailsModal;
