import { createSlice } from "@reduxjs/toolkit";


const inputSlice = createSlice({
    name: 'user',
    initialState: {
        userAuthe: 1,
        userData: []
    },
    reducers: {
        addUserData(state, action) {
            state.userAuthe = 3;
            state.userData = action.payload
        },
        makeLogin(state) {
            state.userAuthe = 1;
        },
        makeLoding(state) {
            state.userAuthe = 2;
        },
        removeData(state) {
            state.userAuthe = 1;
            state.userData = [];
        }
    }
});


export const inputaction = inputSlice.actions;
export default inputSlice.reducer;