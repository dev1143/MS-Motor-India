import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    values: 'initial',
    registerValue: {},
    message: '',
    booleanVal: false,

    // loginValue: {}
    // topPriorityPost: []
}
export const loginregisterslice = createSlice({
    name: 'loginReger',
    initialState,
    reducers: {
        createRegister: (state, action) => {
            state.registerValue = action.payload
        },
        // storeLoginValues: (state, action) => {
        //     console.log('login store____', action.payload)
        //     state.loginValue = action.payload
        // }

        // reducers functions to be added sequentially
    }
})




export const { createRegister } = loginregisterslice.actions

export default loginregisterslice.reducer
