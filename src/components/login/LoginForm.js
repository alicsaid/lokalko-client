import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    InputAdornment,
    IconButton,
    Box
} from '@mui/material';
import { Link } from "react-router-dom";
import "./Login.css";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const LoginForm = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth="lg" className="login-container">
            <Grid container spacing={0}>
                <Grid item xs={12} md={6} className="login-image-container">
                    <img src="https://source.unsplash.com/random/800x600/?nature" alt="random" className="login-image" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ background: "#f6f6f6" }}>
                        <CardContent className="m-5">
                            <Typography variant="h4" align="center" mt={2} mb={2} style={{ color: "#303f9f" }}>
                                Admin Login
                            </Typography>
                            <Typography variant="subtitle1" align="center" mt={2} mb={4} style={{ color: "#757575" }}>
                                WELCOME TO LOKALKO
                            </Typography>
                            <form noValidate autoComplete="off">
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box>
                                        <TextField
                                            label="Email"
                                            id="defaultLoginEmail"
                                            type="email"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <FormControl variant="outlined">
                                            <TextField
                                                id="defaultLoginPassword"
                                                margin="normal"
                                                variant="outlined"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary" style={{ marginTop: '2rem' }}>
                                            Login
                                        </Button>
                                    </Link>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginForm;
