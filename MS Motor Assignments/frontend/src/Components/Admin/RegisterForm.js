import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import '../styles.css';
import { useDispatch } from 'react-redux';
import { createRegisterForm } from "../../actions/loginregisteractions"
import { validateEmail } from '../../actions/loginregisteractions';

export default function RegisterForm() {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email_Id: '',
        password: ''
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmitFunction = (e) => {
        e.preventDefault();
        const { first_name, last_name, email_Id, password } = values
        const obj = {
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email_Id: email_Id.trim(),
            password: password
        }
        // dispatch call to be made over here

        dispatch(createRegisterForm(obj))
        console.log('submit___', values)
        setValues({
            first_name: '',
            last_name: '',
            email_Id: '',
            password: ''
        })
    }

    const validate = () => {
        let bool = false
        if ((values.first_name.length == 0 || values.last_name.length == 0 || values.email_Id.length == 0 || values.password.length == 0)) {
            bool = true
        }

        if (!validateEmail(values.email_Id)) {
            bool = true
        }

        return bool
    }


    return (
        <Box
            className="box-div"
        >
            <Paper className='paper-div' elevation={13}>
                <p style={{ fontSize: "20px", marginTop: "100px", textAlign: "center" }}><b>Register Form</b></p>
                <form className='form-div' onSubmit={handleSubmitFunction}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            style={{ marginBottom: "25px" }}
                            value={values.first_name}
                            label='First Name'
                            id="outlined-basic"
                            name="first_name"
                            onChange={handleChange}
                            variant="outlined" />

                        <TextField
                            style={{ marginBottom: "25px" }}
                            value={values.last_name}
                            label='Last Name'
                            id="outlined-basic"
                            name="last_name"
                            onChange={handleChange}
                            variant="outlined" />

                        <TextField
                            style={{ marginBottom: "25px" }}
                            value={values.email_Id}
                            label='Email Id'
                            id="outlined-basic"
                            name="email_Id"
                            onChange={handleChange}
                            variant="outlined" />


                        <TextField
                            type="password"
                            value={values.password}
                            label='Password'
                            id="outlined-basic"
                            name="password"
                            onChange={handleChange}
                            variant="outlined" />
                        <div className='action-buttons' >
                            <Button disabled={validate()} type="submit" variant="outlined" >Sign Up</Button>
                            <Link to="/login"><Button variant="outlined" > Go Back to Login Page</Button></Link>
                        </div>
                    </div>
                </form>
            </Paper>
        </Box>

    )
}
