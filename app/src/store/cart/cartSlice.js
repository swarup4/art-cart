import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        removeItem: (state, action) => {
            console.log("Data Remove ", action.payload)
            state.items.map(x => x.id).indexOf(action.payload)
        }
    }
});

export const {addItem, removeItem} = cartSlice.actions
export default cartSlice.reducer;