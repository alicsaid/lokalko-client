import React, {useState, useEffect} from "react";
import {Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField} from "@mui/material";
import {Info, Delete} from "@mui/icons-material";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Components
import UserDetailsModal from "./UserDetailsModal";
import UserDeleteModal from "./UserDeleteModal";

// CSS
import "./Users.css";
import {useNavigate} from "react-router-dom";

function UsersTable() {
    const navigate = useNavigate()
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCloseModals = () => {
        setShowDetailsModal(false);
        setShowDeleteModal(false);
    };

    const handleOpenDetailsModal = (user) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    const handleOpenDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDelete = (userId) => {
        axios
            .delete(`/admin/users/${userId}/delete/`,
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
            )
            .then((response) => {
                console.log("User deleted");
                setRows((prevRows) => prevRows.filter((row) => row.user_id !== userId));
                toast.success('User deleted!');
                handleCloseModals();
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error("Error deleting user:", error);
                toast.error('Error deleting user!');
            });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const columns = [
        {field: "index", headerName: "No.", width: 100},
        {field: "email", headerName: "Email", width: 400},
        {field: "city", headerName: "City", width: 250},
        {field: "actions", headerName: "Actions", width: 330},
    ];

    useEffect(() => {
        axios
            .get("/admin/users",
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
            )
            .then((response) => {
                const users = response.data.users.map((user, index) => ({
                    ...user,
                    index: index + 1,
                }));
                setRows(users);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredRows(rows);
        } else {
            const filteredData = rows.filter((row) =>
                row.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRows(filteredData);
        }
    }, [searchTerm, rows]);

    return (
        <div>
            <div className="table-header">
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <TableContainer className="table-container">
                <Table className="users-table">
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
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredRows.map((row) => (
                                <TableRow key={row.index}>
                                    <TableCell align="center">{row.index}.</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.city}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="primary"
                                            size="small"
                                            onClick={() => handleOpenDetailsModal(row)}
                                            style={{color: "#3B9AFF"}}
                                        >
                                            <Info/>
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

            <UserDetailsModal
                show={showDetailsModal}
                handleClose={handleCloseModals}
                user={selectedUser}
            />

            <UserDeleteModal
                show={showDeleteModal}
                handleClose={handleCloseModals}
                handleDelete={handleDelete}
                user={selectedUser}
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
}

export default UsersTable;
