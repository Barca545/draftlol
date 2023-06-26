import { configureStore } from "@reduxjs/toolkit";
import {combineReducers } from '@reduxjs/toolkit'
import  blueDraftReducer from "./Slices/blueDraftSlice";
import redDraftReducer from "./Slices/redDraftSlice";
import { apiSlice } from "./Slices/apiSlice";

export const store =  configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        blueDraft: blueDraftReducer,
        redDraft: redDraftReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  })
  
   
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store