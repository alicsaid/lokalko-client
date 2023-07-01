import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu
} from 'cdbreact';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Check as CheckIcon,
    Person as PersonIcon,
    Build as BuildIcon,
    Archive as ArchiveIcon,
    ExitToApp as ExitToAppIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';


const Navigation = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
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
                                <CDBSidebarMenuItem icon="check">Requests</CDBSidebarMenuItem>
                            </Link>
                            <Link to="/archived-requests">
                                <CDBSidebarMenuItem icon="archive">Archived requests</CDBSidebarMenuItem>
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
                            <Link to="/">
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
                                <ListItemText primary="Requests"/>
                            </ListItem>
                        </Link>
                        <Link to="/archived-requests" style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <ArchiveIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Archived requests"/>
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
                        <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
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
        </div>
    )
};

export default Navigation;
