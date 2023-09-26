import React, {useState} from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    InputAdornment,
    IconButton,
} from '@mui/material';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email === '' || password === '') {
                toast.error('Please fill in all fields!');
                return;
            }

            const response = await axios.post('/admin/login', {
                email: email,
                password: password
            });

            console.log(response)

            if (response.data.message === 'Logged in!') {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            } else if(response.data.code === 401) {
                toast.error("Invalid credentials!");
            } else {
                toast.error(response.data.message);
                console.log('Auth not good!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Container maxWidth="lg" className="login-container">
                <Card sx={{background: '#f6f6f6'}}>
                    <CardContent className="m-5">
                        <Typography variant="h4" align="center" mt={2} mb={2} style={{color: '#303f9f'}}>
                            Welcome back!
                        </Typography>
                        <Typography variant="subtitle1" align="center" mt={2} mb={4} style={{color: '#757575'}}>
                            ADMIN LOGIN
                        </Typography>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <TextField
                                    sx={{width: "15rem"}}
                                    required
                                    label="Email"
                                    id="defaultLoginEmail"
                                    type="email"
                                    name="email"
                                    margin="normal"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    sx={{width: "15rem"}}
                                    required
                                    id="defaultLoginPassword"
                                    margin="normal"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                                    name="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handlePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button variant="contained" color="primary" style={{marginTop: '2rem'}} type="submit">
                                    Login
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
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

export default LoginForm;
