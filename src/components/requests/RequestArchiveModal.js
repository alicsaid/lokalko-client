import React from "react";
import { Modal, Button } from "react-bootstrap";

function RequestArchiveModal({ show, handleClose, handleArchive, request }) {
    const handleArchiveClick = () => {
        handleArchive(request.request_id);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Archive Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to archive this request?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="warning" onClick={handleArchiveClick}>
                    Archive
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RequestArchiveModal;
