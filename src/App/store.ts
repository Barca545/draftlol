import { configureStore } from "@reduxjs/toolkit";
import {combineReducers } from '@reduxjs/toolkit'
import  blueDraftReducer from "./Slices/bluedraftSlice";

export const store =  configureStore({
    reducer:{
        blueDraft: blueDraftReducer
    },
  })
  
   
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store