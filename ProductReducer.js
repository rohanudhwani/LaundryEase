import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name:"product",
    initialState:{
        product:[],
    },
    reducers:{
        getProducts:(state,action) => {
            state.product.push({...action.payload});
        },
        incrementQty:(state,action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            itemPresent.quantity++;
        },
        decrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
        
            if (itemPresent.quantity === 1) {
                // If quantity is 1, remove the item from the product array
                state.product = state.product.filter((item) => item.id !== action.payload.id);
            } else {
                // Decrement the quantity
                itemPresent.quantity--;
            }
        },
        
    }
});

export const {getProducts,incrementQty,decrementQty} = productSlice.actions;

export default productSlice.reducer;