import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cart/cartSlice'

export const store: any = configureStore({
    reducer: {
        cart: cartSlice
    },
})