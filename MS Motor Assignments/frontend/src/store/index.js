import { configureStore } from '@reduxjs/toolkit'
import loginRegisterReducer from "../slice/loginregisterslice"
import carsReducer from "../slice/carSlice"

export const store = configureStore({
    reducer: {
        loginReger: loginRegisterReducer,
        carsStore: carsReducer
    },
})

