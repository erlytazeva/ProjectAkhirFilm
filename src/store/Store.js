import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Reducer/ThemeReducer";

const store = configureStore({
    reducer:{
        theme :themeReducer,
    },
})

export default store;