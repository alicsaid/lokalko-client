import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Box, TextField } from "@mui/material";

function ServiceDetailsModal({ show, handleClose, service }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Service Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box mb={2}>
                    <TextField
                        label="Service"
                        value={service?.service}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Address"
                        value={service?.address}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="City"
                        value={service?.city}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Telephone"
                        value={service?.telephone}
                        readOnly
                        fullWidth
                    />
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ServiceDetailsModal;
