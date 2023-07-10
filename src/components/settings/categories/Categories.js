import React, {useEffect, useState} from "react";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";

//components
import CategoryDeleteModal from "../../settings/categories/CategoryDeleteModal";
import CategoryEditModal from "../../settings/categories/CategoryEditModal";
import CategoryAddModal from "../../settings/categories/CategoryAddModal";

// CSS
import "../Settings.css";

const Categories = () => {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCloseModals = () => {
        setShowDeleteModal(false);
        setShowEditModal(false);
        setShowAddModal(false);
    };

    const handleOpenDeleteModal = (category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const handleOpenEditModal = (category) => {
        setSelectedCategory(category);
        setShowEditModal(true);
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleDelete = (categoryId) => {
        console.log(categoryId)
        axios
            .delete(`/admin/categories/${categoryId}/delete/`)
            .then((response) => {
                console.log("Category deleted:", response.data);
                setRows((prevRows) => prevRows.filter((row) => row.category_id !== categoryId));
                toast.success('Category deleted!');
                handleCloseModals();
            })
            .catch((error) => {
                console.error("Error deleting category:", error);
                toast.error('Error deleting category!');
            });
    };

    const handleSave = (updatedCategory) => {
        console.log("Saving updated category:", updatedCategory);

        const {category_id, category} = updatedCategory;

        const data = {
            category_id,
            category
        };

        axios
            .put(`/admin/categories/${category_id}/update/`, data)
            .then((response) => {
                console.log("Category updated:", response.data);

                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.category_id === category_id ? {...row, ...updatedCategory} : row
                    )
                );

                toast.success("Category updated!");
                handleCloseModals();
            })
            .catch((error) => {
                console.error("Error updating category:", error);
                toast.error("Error updating category!");
            });
    };

    const handleAddCategory = (newCategory) => {

        console.log("Adding new category:", newCategory);

        const {category} = newCategory;

        const data = {
            category
        };

        axios
            .post("/admin/categories/create/", data)
            .then((response) => {
                console.log("Category added:", response.data);

                const newIndex = rows.length + 1;

                const newCategoryWithIndex = {...newCategory, index: newIndex};
                setRows((prevRows) => [...prevRows, newCategoryWithIndex]);

                toast.success('Category created!');
                handleCloseModals();
            })
            .catch((error) => {
                console.error("Error adding category:", error);
                toast.error('Error creating category!');
            });
    };

    useEffect(() => {
        axios
            .get("/admin/categories/")
            .then((response) => {
                const categories = response.data.categories.map((category, index) => ({
                    ...category,
                    index: index + 1,
                }));
                console.log(response.data)
                setRows(categories);
                setFilteredRows(categories);

            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredRows(rows);
        } else {
            const filteredData = rows.filter((row) =>
                row.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRows(filteredData);
        }
    }, [searchTerm, rows]);

    const columns = [
        {field: "index", headerName: "No.", width: 380},
        {field: "category", headerName: "Category name", width: 450},
        {field: "actions", headerName: "Actions", width: 350},
    ];

    return (
        <div>
            <h5>Categories</h5>
            <div className="table-header">
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddModal}
                >
                    <Add/> Add Category
                </Button>
            </div>
            <div className="table-container">
                <TableContainer>
                    <Table className="categories-table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.field}
                                        align="center"
                                        width={column.width}
                                        style={{fontWeight: "600"}}
                                    >
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length === 0 ? (
                                <TableRow>
                                    <TableCell align="center" colSpan={columns.length}>
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRows.map((row) => (
                                    <TableRow key={row.index}>
                                        <TableCell align="center">{row.index}.</TableCell>
                                        <TableCell align="center">{row.category}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="warning"
                                                size="small"
                                                onClick={() => handleOpenEditModal(row)}
                                                style={{color: "#FFC107"}}
                                            >
                                                <Edit/>
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="small"
                                                onClick={() => handleOpenDeleteModal(row)}
                                                style={{color: "#DC3545"}}
                                            >
                                                <Delete/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <CategoryDeleteModal
                show={showDeleteModal}
                handleClose={handleCloseModals}
                handleDelete={handleDelete}
                category={selectedCategory}
            />

            <CategoryEditModal
                show={showEditModal}
                handleClose={handleCloseModals}
                handleSave={handleSave}
                category={selectedCategory}
            />

            <CategoryAddModal
                show={showAddModal}
                handleClose={handleCloseModals}
                handleAddCategory={handleAddCategory}
            />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>

    );
};

export default Categories;
