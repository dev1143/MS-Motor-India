// import { registerForm, loginForm } from "../services/loginregisterservice"
import { toast } from 'react-toastify';
import axios from 'axios';
// import { userlocalData } from "../slice/postslice"

export function createRegisterForm(data) {
    return (async (dispatch) => {
        try {
            // service call to be handled
            let request = await axios.post('http://localhost:5000/api/register-user', data)
            console.log('form-build', request)
            if (request.status == 200) {
                toast(request.message)
            }
            if (request && request.data.status != 200) {
                toast.error(request.data.message)
            }
        } catch (err) {
            toast(err.message)
        }

    })
}

export function validateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


export function loginRegisterForm(data) {
    return (async (dispatch) => {
        try {
            // service call to be handled
            let request = await axios.post('http://localhost:5000/api/login-user', data);
            console.log('loggedin status', request)
            if (request && request.data.statusCode == 200) {
                window.localStorage.setItem("store-value", JSON.stringify(request))
                window.location.assign('/admin-page')
                toast.success('Logged In Successfully')
            } else if (request && request.data.statusCode != 200) {
                toast.error(request.data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }

    })

}



