import React from "react";
import {Modal} from "react-bootstrap";
import {Button} from "@mui/material";

function RequestArchiveModal({show, handleClose, handleArchive, request}) {
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
                <div className="modal-buttons">
                    <Button className="close-button" variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="archive-button" variant="outlined" onClick={handleArchiveClick}>
                        Archive
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default RequestArchiveModal;
