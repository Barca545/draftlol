import { configureStore } from "@reduxjs/toolkit";
import {combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from "./Slices/apiSlice";
import PickBanReducer  from "./Slices/pickBanSlice";
import draftListReducer from "./Slices/draftlistSlice";

export const store =  configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        pickBanIndex: PickBanReducer,
        draftlist: draftListReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  })
  
   
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store