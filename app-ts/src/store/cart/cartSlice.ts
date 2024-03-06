import { createSlice } from "@reduxjs/toolkit";
import { Item } from '../../components/cart/datatype'

const cartSlice: any = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state: any, action: { payload: Item }) => {
            state.items.push(action.payload);
        },
        removeItem: (state: any, action: { payload: Item }) => {
            const index = state.items.map((x: any) => x.id).indexOf(action.payload)
            state.items.splice(index, 1)
        },
        clearItem: (state: any) => {
            state.items = [];
        }
    }
});

export const { addItem, removeItem, clearItem } = cartSlice.actions
export default cartSlice.reducer;