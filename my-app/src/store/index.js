import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./input.js"

const store = configureStore({
    reducer: inputReducer
});



export default store;