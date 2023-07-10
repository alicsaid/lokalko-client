import React from "react";
import {Modal} from "react-bootstrap";
import {Box, TextField, Button} from "@mui/material";

function ArchivedRequestDetailsModal({show, handleClose, request}) {
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
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Date reported"
                        value={request?.date}
                        readOnly
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Time reported"
                        value={request?.time}
                        readOnly
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Address"
                        value={request?.address}
                        readOnly
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="City"
                        value={request?.city}
                        readOnly
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Category"
                        value={request?.category}
                        readOnly
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Service"
                        value={request?.service}
                        readOnly
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Severity"
                        value={request?.severity}
                        readOnly
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Status"
                        value={request?.status}
                        readOnly
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button className="close-button" variant="outlined" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ArchivedRequestDetailsModal;
