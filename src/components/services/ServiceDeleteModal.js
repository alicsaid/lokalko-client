import React from "react";
import {Modal} from "react-bootstrap";
import {Button} from "@mui/material";

function ServiceDeleteModal({show, handleClose, handleDelete, service}) {
    const handleDeleteClick = () => {
        handleDelete(service.service_id);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this service?</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-buttons">
                    <Button className="close-button" variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="delete-button" variant="outlined" onClick={handleDeleteClick}>
                        Delete
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ServiceDeleteModal;
