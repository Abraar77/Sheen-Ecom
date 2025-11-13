import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './features/auth/authSlice'
import favoritesReducer from "../redux/features/favorites/favoritesSlice"
import {get} from "mongoose";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import cartSliceReducer from "./features/cart/cartSlice";
import shopReducer from "./features/shop/shopSlice"
const intialFavorites= getFavoritesFromLocalStorage() || []
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
         auth:authReducer,
         favorites: favoritesReducer,
         cart: cartSliceReducer,
         shop: shopReducer,
    },

    preloadedState: {
        favorites: intialFavorites
    },

    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

setupListeners(store.dispatch);
export default store