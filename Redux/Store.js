import { configureStore } from "@reduxjs/toolkit";
// import FoodReducers from './Slice/FavSlice';
import FoodSlice from "./Slice/FoodSlice";

const store = configureStore({
    reducer:{
        food : FoodSlice,
    }
})

export default store;