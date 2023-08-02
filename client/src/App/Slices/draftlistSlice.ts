import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialDraftList } from "../../Components/initialStates/initialDraftList";
import { DraftList } from "../Types/champ-select-types";

const initialState:DraftList = initialDraftList

export const DraftListSlice = createSlice({
  name: 'draftList',
  initialState: initialState,
  reducers: {
    setSelection: (state,action: PayloadAction<string[]>) => {
      state.champList = state.champList.filter((item)=>item[0]!==action.payload[0])
      state.topList = state.topList.filter((item)=>item[0]!==action.payload[0])
      state.jgList = state.jgList.filter((item)=>item[0]!==action.payload[0])
      state.midList = state.midList.filter((item)=>item[0]!==action.payload[0])
      state.bottomList = state.bottomList.filter((item)=>item[0]!==action.payload[0])
      state.supportList = state.supportList.filter((item)=>item[0]!==action.payload[0])
      
      if (state.turnNumber<=19){
        switch(state.turn){
          case 'Blue': {
            state.turn = 'Red'
            state.turnNumber += 1
            break
          }
          case 'Red': {
            state.turn = 'Blue'
            state.turnNumber += 1
            break
          }
        }
      }
      else{
        state.turn = 'Done'
      }
    },
  }
})
export const {} = DraftListSlice.actions
export default DraftListSlice.reducer

///selectors
