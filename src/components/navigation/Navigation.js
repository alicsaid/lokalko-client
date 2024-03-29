import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import {
    AppBar,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import { Modal } from 'react-bootstrap';
import {
    Archive as ArchiveIcon,
    Build as BuildIcon,
    Check as CheckIcon,
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    Menu as MenuIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Navigation = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post('/admin/logout');
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="sidebar">
                <CDBSidebar style={{height: "100vh"}} textColor="#333" backgroundColor="#f0f0f0">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars"/>}>
                        <div className="container" style={{display: 'flex', alignItems: 'center'}}>
                            <h6 className="ms-2">Lokalko ™</h6>
                        </div>
                    </CDBSidebarHeader>
                    <CDBSidebarContent>
                        <CDBSidebarMenu>
                            <Link to="/dashboard">
                                <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
                            </Link>
                            <Link to="/requests">
                                <CDBSidebarMenuItem icon="check">All Reports</CDBSidebarMenuItem>
                            </Link>
                            <Link to="/archived-requests">
                                <CDBSidebarMenuItem icon="archive">Archived reports</CDBSidebarMenuItem>
                            </Link>
                            <Link to="/users">
                                <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
                            </Link>
                            <Link to="/services">
                                <CDBSidebarMenuItem icon="tools">Services</CDBSidebarMenuItem>
                            </Link>
                            <Link to="/settings">
                                <CDBSidebarMenuItem icon="cogs">Settings</CDBSidebarMenuItem>
                            </Link>
                        </CDBSidebarMenu>
                        <CDBSidebarMenu>
                            <Link to="" onClick={() => setShowLogoutModal(true)}>
                                <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
                            </Link>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                </CDBSidebar>
            </div>
            <div className="mobile-menu">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Lokalko ™
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
                    <List>
                        <Link to="/dashboard" style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Dashboard"/>
                            </ListItem>
                        </Link>
                        <Link to="/requests" style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <CheckIcon/>
                                </ListItemIcon>
                                <ListItemText primary="All Reports"/>
                            </ListItem>
                        </Link>
                        <Link to="/archived-requests" style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <ArchiveIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Archived reports"/>
                            </ListItem>
                        </Link>
                        <Link to="/users" style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Users"/>
                            </ListItem>
                        </Link>
                        <Link to="/services" style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <BuildIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Services"/>
                            </ListItem>
                        </Link>
                        <Link to="/settings" style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Settings"/>
                            </ListItem>
                        </Link>
                        <Link to="/" onClick={() => setShowLogoutModal(true)}
                              style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </div>
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </div>
    )
};


const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Logout Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to logout?</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-buttons">
                    <Button className="close-button" variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="delete-button" variant="outlined" onClick={onConfirm}>
                        Logout
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default Navigation;
