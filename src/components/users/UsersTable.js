import React, {useState, useEffect} from "react";
import {Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField} from "@mui/material";
import {Info, Delete} from "@mui/icons-material";
import axios from "axios";

// Components
import UserDetailsModal from "./UserDetailsModal";
import UserDeleteModal from "./UserDeleteModal";

// CSS
import "./Users.css";

function UsersTable() {
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
        // Handle delete logic here
        console.log("Deleting user with ID:", userId);
        handleCloseModals();
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const columns = [
        {field: "index", headerName: "No.", width: 100},
        {field: "email", headerName: "Email", width: 400},
        {field: "city", headerName: "City", width: 220},
        {field: "actions", headerName: "Actions", width: 200},
    ];

    useEffect(() => {
        axios
            .get("/admin/users")
            .then((response) => {
                const users = response.data.users.map((user, index) => ({
                    ...user,
                    index: index + 1,
                }));
                setRows(users);
            })
            .catch((error) => {
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

            <TableContainer>
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
                        {filteredRows.map((row) => (
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
                        ))}
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
        </div>
    );
}

export default UsersTable;
