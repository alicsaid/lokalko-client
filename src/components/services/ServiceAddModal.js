import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {TextField, Button} from "@mui/material";

function ServiceAddModal({show, handleClose, handleAddService}) {
    const [newService, setNewService] = useState({
        service: "",
        address: "",
        city: "",
        telephone: "",
    });

    const handleNewServiceChange = (event) => {
        setNewService((prevService) => ({
            ...prevService,
            [event.target.name]: event.target.value,
        }));
    };

    const handleAdd = () => {
        handleAddService(newService);
        setNewService({
            service: "",
            address: "",
            city: "",
            telephone: "",
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <TextField
                            label="Service"
                            variant="outlined"
                            size="small"
                            name="service"
                            value={newService.service}
                            onChange={handleNewServiceChange}
                            className="w-100"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Address"
                            variant="outlined"
                            size="small"
                            name="address"
                            value={newService.address}
                            onChange={handleNewServiceChange}
                            className="w-100"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="City"
                            variant="outlined"
                            size="small"
                            name="city"
                            value={newService.city}
                            onChange={handleNewServiceChange}
                            className="w-100"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Telephone"
                            variant="outlined"
                            size="small"
                            name="telephone"
                            value={newService.telephone}
                            onChange={handleNewServiceChange}
                            className="w-100"
                            required
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-buttons">
                    <Button className="close-button" variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="save-button" variant="outlined" onClick={handleAdd}>
                        Add
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ServiceAddModal;
