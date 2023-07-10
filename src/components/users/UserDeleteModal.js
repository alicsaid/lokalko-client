import React from "react";
import {Modal} from "react-bootstrap";
import {Button} from '@mui/material';

function UserDeleteModal({show, handleClose, handleDelete, user}) {
    const handleConfirmDelete = () => {
        //console.log(user.user_id)
        //console.log(user)
        handleDelete(user.user_id);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this user?</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-buttons">
                    <Button className="close-button" variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="delete-button" variant="outlined" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default UserDeleteModal;
