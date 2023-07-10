import React, {useState} from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    Box
} from '@mui/material';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

            if (response.data.message === 'Logged in successfully!') {
                window.location.href = '/dashboard';
            } else {
                toast.error(response.data.message);
                console.log('Auth not good!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Container maxWidth="lg" className="login-container">
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6} className="login-image-container">
                        <img src="https://source.unsplash.com/random/800x600/?nature" alt="random"
                             className="login-image"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{background: '#f6f6f6'}}>
                            <CardContent className="m-5">
                                <Typography variant="h4" align="center" mt={2} mb={2} style={{color: '#303f9f'}}>
                                    Admin Login
                                </Typography>
                                <Typography variant="subtitle1" align="center" mt={2} mb={4} style={{color: '#757575'}}>
                                    WELCOME TO LOKALKO
                                </Typography>
                                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <Box>
                                            <TextField
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
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <FormControl variant="outlined">
                                                <TextField
                                                    required
                                                    id="defaultLoginPassword"
                                                    margin="normal"
                                                    variant="outlined"
                                                    type='password'
                                                    name='password'
                                                    label="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </FormControl>
                                        </Box>
                                        <Button variant="contained" color="primary" style={{marginTop: '2rem'}}
                                                type="submit">
                                            Login
                                        </Button>
                                    </Box>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
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
