import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    values: 'initial',
    listofCars: null,
    loader: true,
    message: '',
    booleanVal: null,
    carId: null,
    carDescription: null
}
export const carslistslice = createSlice({
    name: 'carsStore',
    initialState,
    reducers: {
        saveCarData: (state, action) => {
            console.log('state of cars', action.payload)
            state.listofCars = action.payload
            state.loader = false
        },
        openloader: (state, action) => {
            state.loader = action.payload
        },
        closeloader: (state, action) => {
            state.loader = action.payload
        },
        openSnackbar: (state, action) => {
            console.log('snackbar__', action.payload)
            state.message = action.payload;
            state.booleanVal = true
            // state.message = action.payload;
        },
        closeSnackbar: (state, action) => {
            state.booleanVal = false
        },
        carID: (state, action) => {
            state.carId = action.payload
        },
        storeDescription: (state, action) => {
            state.carDescription = action.payload
        }

        // reducers functions to be added sequentially
    }
})




export const { saveCarData, openloader, closeloader, carID, closeSnackbar, openSnackbar, storeDescription } = carslistslice.actions

export default carslistslice.reducer
