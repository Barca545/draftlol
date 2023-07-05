import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  pickIdex: 0,
  banIndex: 0
}

export const PickBanSlice = createSlice({
  name: 'pickBan',
  initialState: initialState,
  reducers: {
    setPickIndex: (state,action: PayloadAction<number>) => {
      state.pickIdex = action.payload
    },
    setBanIndex: (state,action: PayloadAction<number>) => {
      state.banIndex = action.payload
    }
  }
})
export const {setPickIndex,setBanIndex} = PickBanSlice.actions
export default PickBanSlice.reducer

///selectors
export const getPickIndex = (state:RootState) => {
  return state.pickBanIndex.pickIdex
}
export const getBanIndex = (state:RootState) => {
  return state.pickBanIndex.banIndex
}