import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {TextField, Button} from "@mui/material";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function ServiceEditModal({show, handleClose, setRows, service}) {
    const navigate = useNavigate()
    const [serviceName, setServiceName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [telephone, setTelephone] = useState("");

    console.log("service:", service);

    useEffect(() => {
        if (service) {
            setServiceName(service.service || "");
            setAddress(service.address || "");
            setCity(service.city || "");
            setTelephone(service.telephone || "");
        }
    }, [service]);

    const handleSave = (updatedService) => {
        console.log("Saving updated service:", updatedService);

        const { service_id, service, address, city, telephone } = updatedService;

        const data = {
            service_id,
            service,
            address,
            city,
            telephone,
        };

        axios
            .put(`/admin/services/${service_id}/update/`
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
                , data)
            .then((response) => {
                console.log("Service updated:", response.data);

                // Update the rows state with the updated service
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.service_id === service_id ? { ...row, ...updatedService } : row
                    )
                );

                toast.success("Service updated!");
                handleClose();
            })
            .catch((error) => {
                if(error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error("Error updating service:", error);
                toast.error("Error updating service!");
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedService = {
            service_id: service.service_id,
            service: serviceName,
            address: address,
            city: city,
            telephone: telephone
        };
        handleSave(updatedService);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <TextField
                            label="Service"
                            variant="outlined"
                            size="small"
                            name="service"
                            className="w-100"
                            required
                            value={serviceName}
                            onChange={(event) => setServiceName(event.target.value)}
                            inputProps={{
                                maxLength: 30
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Address"
                            variant="outlined"
                            size="small"
                            name="address"
                            className="w-100"
                            required
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            inputProps={{
                                maxLength: 30
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="City"
                            variant="outlined"
                            size="small"
                            name="city"
                            className="w-100"
                            required
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            label="Telephone"
                            variant="outlined"
                            size="small"
                            name="telephone"
                            className="w-100"
                            required
                            value={telephone}
                            onChange={(event) => setTelephone(event.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-buttons">
                    <Button className="close-button" variant="outlined" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="save-button" variant="outlined" onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ServiceEditModal;
