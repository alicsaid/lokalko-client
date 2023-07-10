import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {TextField, Button} from "@mui/material";

function CategoryAddModal({show, handleClose, handleAddCategory}) {
    const [newCategory, setNewCategory] = useState({
        category: ""
    });

    const handleNewCategoryChange = (event) => {
        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [event.target.name]: event.target.value,
        }));
    };

    const handleAdd = () => {
        handleAddCategory(newCategory);
        setNewCategory({
            category_id: 0,
            category: ""
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <TextField
                            label="Category"
                            variant="outlined"
                            size="small"
                            name="category"
                            value={newCategory.category}
                            onChange={handleNewCategoryChange}
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

export default CategoryAddModal;
