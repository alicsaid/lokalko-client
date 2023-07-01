import React from "react";
import {Modal, Button} from "react-bootstrap";
import {Box, TextField} from "@mui/material";

function ArchivedRequestDetailsModal({show, handleClose, archivedRequest}) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Request Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box mb={2}>
                    <TextField
                        label="Title"
                        value={archivedRequest?.title}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Description"
                        value={archivedRequest?.description}
                        readOnly
                        multiline
                        rows={3}
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Date reported"
                        value={archivedRequest?.date}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Time reported"
                        value={archivedRequest?.time}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Address"
                        value={archivedRequest?.address}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="City"
                        value={archivedRequest?.city}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Category"
                        value={archivedRequest?.category}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Service"
                        value={archivedRequest?.service}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Severity"
                        value={archivedRequest?.severity}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Status"
                        value={archivedRequest?.status}
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

export default ArchivedRequestDetailsModal;
