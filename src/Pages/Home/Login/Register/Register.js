import { Alert, Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';


const Register = () => {
    const [registerData, setRegisterData] = useState();
    const { user, registerUser, isLoading, authError } = useAuth();
    const [department, setDepartment] = useState('');
    // const [image, setImage] = useState(null);

    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    const navigate = useNavigate();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = { ...registerData };
        newRegisterData[field] = value;
        setRegisterData(newRegisterData);
    }

    const handleRegisterSubmit = e => {
        e.preventDefault();
        if (registerData.password !== registerData.password2) {
            alert('your password did not match');
        }
        // if (!image) {
        //     return;
        // }
        // const formData = new FormData();
        // formData.append('image', image);
        // fetch('http://localhost:5000/users/photo', {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log('Success:', result);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });



        registerUser(registerData.email, registerData.password, registerData.name, registerData.department, navigate);
    }
    return (
        <div>
            <Container>
                <Grid>
                    <Box style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <Typography
                            sx={{ width: 1, m: 1 }}
                            variant="subtitle1"
                            gutterBottom component="span">
                            Please Register
                        </Typography>
                        {!isLoading && <form onSubmit={handleRegisterSubmit}>
                            {/* <Input
                                accept="image/*"
                                type="file"
                                onChange={e => setImage(e.target.files[0])}
                            /> */}

                            <TextField
                                required
                                sx={{ width: 1, m: 1 }}
                                name="name"
                                onBlur={handleOnBlur}
                                id="standard-basic-name"
                                label="Your Name"
                                variant="standard" />

                            <FormControl variant="standard" sx={{ width: 1, m: 1 }}>
                                <InputLabel id="demo-simple-select-standard-label">department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name="department"
                                    onBlur={handleOnBlur}
                                    value={department}
                                    onChange={handleChange}
                                    label="department"
                                >
                                    <MenuItem value="Department-A">Department-A</MenuItem>
                                    <MenuItem value="Department-B">Department-B</MenuItem>
                                    <MenuItem value="Department-C">Department-C</MenuItem>
                                    <MenuItem value="Department-D">Department-D</MenuItem>
                                    <MenuItem value="Department-E">Department-E</MenuItem>
                                    <MenuItem value="Receptionist">Receptionist</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                required
                                sx={{ width: 1, m: 1 }}
                                name="email"
                                type="email"
                                onBlur={handleOnBlur}
                                id="standard-basic-email"
                                label="Your E-mail"
                                variant="standard" />


                            <TextField
                                required
                                sx={{ width: 1, m: 1 }}
                                name="password"
                                onBlur={handleOnBlur}
                                id="filled-password-input"
                                label="Password"
                                type="password"
                                variant="standard"
                            />

                            <TextField
                                required
                                sx={{ width: 1, m: 1 }}
                                name="password2"
                                onBlur={handleOnBlur}
                                id="filled-password2-input2"
                                label="Re-Type Password"
                                type="password"
                                variant="standard"
                            />


                            <Button
                                sx={{ width: 1, m: 1 }}
                                type="submit"
                                variant="contained"
                                color="success">
                                Register
                            </Button>

                            <NavLink
                                to='/login'
                                style={{ textDecoration: 'none' }}>
                                <Button variant="text" color="error">Already Register? Please Login</Button>
                            </NavLink>
                        </form>}

                        {isLoading && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>}
                        {user?.email && <Alert onClose={() => { }}>You have successfully create an account!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}

                    </Box>
                </Grid>
            </Container>

        </div >
    );
};

export default Register;