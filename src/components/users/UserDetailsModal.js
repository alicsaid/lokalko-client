import React from "react";
import { Modal, Button } from "react-bootstrap";
import {Box, TextField} from "@mui/material";

function UserDetailsModal({ show, handleClose, user }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box mb={2}>
                    <TextField
                        label="Username"
                        value={user?.username}
                        readOnly
                        fullWidth
                        margin="normal"
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Email"
                        value={user?.email}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="City"
                        value={user?.city}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Date of Birth"
                        value={user?.date_of_birth}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Gender"
                        value={user?.gender}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Telephone"
                        value={user?.telephone}
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

export default UserDetailsModal;
