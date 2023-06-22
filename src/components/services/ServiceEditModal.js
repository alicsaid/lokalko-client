import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { TextField } from "@mui/material";

function ServiceEditModal({ show, handleClose, service, handleSave }) {
    const [name, setName] = useState(service ? service.service : "");
    const [address, setAddress] = useState(service ? service.address : "");
    const [city, setCity] = useState(service ? service.city : "");
    const [telephone, setTelephone] = useState(service ? service.telephone : "");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Create updated service object
        const updatedService = {
            ...service,
            name: name,
            address: address,
            city: city,
            telephone: telephone,
        };

        // Call the handleSave function with the updated service object
        handleSave(updatedService);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value.slice(0, 50))}
                            className="w-100"
                            required
                            inputProps={{
                                maxLength: 30,
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Address"
                            variant="outlined"
                            size="small"
                            value={address}
                            onChange={(e) => setAddress(e.target.value.slice(0, 50))}
                            className="w-100"
                            required
                            inputProps={{
                                maxLength: 30,
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="City"
                            variant="outlined"
                            size="small"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-100"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Telephone"
                            variant="outlined"
                            size="small"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            className="w-100"
                            required
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit">
                    Save
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ServiceEditModal;
