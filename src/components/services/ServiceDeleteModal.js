import React from "react";
import { Modal, Button } from "react-bootstrap";

function ServiceDeleteModal({ show, handleClose, handleDelete, service }) {
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
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteClick}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ServiceDeleteModal;
