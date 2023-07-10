import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap";
import {TextField, Button} from "@mui/material";

function CategoryEditModal({show, handleClose, category, handleSave}) {
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        if (category) {
            setCategoryName(category.category || "");
        }
    }, [category]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedCategory = {
            category_id: category.category_id,
            category: categoryName
        };
        handleSave(updatedCategory);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <TextField
                            label="Category"
                            variant="outlined"
                            size="small"
                            name="category"
                            className="w-100"
                            required
                            value={categoryName}
                            onChange={(event) => setCategoryName(event.target.value)}
                            inputProps={{
                                maxLength: 30
                            }}
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

export default CategoryEditModal;
