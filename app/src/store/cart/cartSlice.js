import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            const index = state.items.map(x => x.id).indexOf(action.payload)
            state.items.splice(index, 1)
        },
        clearItem: (state) => {
            state.items = [];
        }
    }
});

export const {addItem, removeItem, clearItem} = cartSlice.actions
export default cartSlice.reducer;