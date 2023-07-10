import React from "react";
import {Modal} from "react-bootstrap";
import {Box, TextField, Button} from "@mui/material";

function UserDetailsModal({show, handleClose, user}) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box mb={2}>
                    <TextField
                        label="First name"
                        value={user?.first_name}
                        readOnly
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Last name"
                        value={user?.last_name}
                        readOnly
                        fullWidth
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
            </Modal.Body>
            <Modal.Footer>
                <Button className="close-button" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserDetailsModal;
