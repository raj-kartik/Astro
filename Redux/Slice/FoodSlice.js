import {  createSlice } from "@reduxjs/toolkit";

const FoodSlice = createSlice({
    name:'food',
    initialState:{
        data:[],
        favorites: []

    },
    reducers:{
        addData: (state,action) =>{
            state.data = [...state.data, ...action.payload ];
        },
        addFav: (state,action) =>{
            if(state.favorites.find((item)=>item == action.payload)) {}
            else  state.favorites.push(action.payload);
        },

        removeFav: (state,action) =>{
            state.favorites = state.favorites.filter((item)=>item !== action.payload );
        }
    }
});

export const {addData, addFav, removeFav } = FoodSlice.actions
export default FoodSlice.reducer;