import React from "react";
import { Modal, Button } from "react-bootstrap";

function ArchivedRequestDeleteModal({ show, handleClose, handleDelete, archivedRequest }) {
    const handleDeleteClick = () => {
        handleDelete(archivedRequest.archived_request_id);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this request?</p>
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

export default ArchivedRequestDeleteModal;
