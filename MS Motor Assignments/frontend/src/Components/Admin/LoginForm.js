import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRegisterForm } from "../../actions/loginregisteractions";
import { validateEmail } from '../../actions/loginregisteractions';

export default function LoginForm() {
    const { message, boolean } = useSelector(((state) => state.loginReger))
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email_Id: '',
        password: ''
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmitFunction = (e) => {
        e.preventDefault();
        const { email_Id, password } = values
        const obj = {
            email_Id: email_Id.trim(),
            password: password.trim()
        }
        // dispatch call to be made over here

        dispatch(loginRegisterForm(obj))
        console.log('submit___', values)
        setValues({
            email_Id: '',
            password: ''
        })
    }

    const validate = () => {
        let bool = false
        if ((values.email_Id.length == 0 || values.password.length == 0)) {
            bool = true
        }

        if (!validateEmail(values.email_Id)) {
            bool = true
        }

        return bool
    }
    console.log('boolean value message__', message, boolean)

    return (
        <Box
            className="box-div"
        >
            <Paper className='paper-div' elevation={3}>

                <div>
                    <b><p style={{ textAlign: "center", fontSize: "20px", marginTop: "100px", paddingTop: "10px" }} >Login Form</p></b>
                    <form className='form-div' onSubmit={handleSubmitFunction}>
                        <div style={{ display: "flex", flexDirection: "column" }}>

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
                            <div className='action-buttons'>
                                <Button disabled={validate()} variant='outlined' type="submit">Log In</Button>
                                <Link to="/register"><Button variant='outlined'>New User,Create account</Button></Link>
                            </div>
                        </div>
                    </form>

                </div>
            </Paper>
        </Box>
    )
}
