import { createSlice } from "@reduxjs/toolkit";


const inputSlice = createSlice({
    name: 'user',
    initialState: {
        userAuthe: false,
        userData: []
    },
    reducers: {
        addUserData(state, action) {
            state.userAuthe = true;
            state.userData = action.payload
        },
        removeData(state) {
            state.userAuthe = false;
            state.userData = {};
        }
    }
});


export const inputaction = inputSlice.actions;
export default inputSlice.reducer;