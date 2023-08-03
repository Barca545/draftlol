import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialDraftList } from "../../Components/initialStates/initialDraftList";
import { DraftList, Ban} from "../Types/champ-select-types";

const initialState:DraftList = initialDraftList

interface BanSelection {
  index:number,
  ban: Ban
}

export const draftListSlice = createSlice({
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
      
      if (state.turnNumber<19){
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
    setDraftList: (state,action: PayloadAction<DraftList>) => {
      state = action.payload
    },
    setBlueBan: (state,action: PayloadAction<BanSelection>) => {
      state.blueBans[action.payload.index] = action.payload.ban
    },
    setRedBan: (state,action: PayloadAction<BanSelection>) => {
      state.redBans[action.payload.index] = action.payload.ban
    },
  }
})

export default draftListSlice.reducer
export const {setDraftList,setSelection,setBlueBan,setRedBan} = draftListSlice.actions

///selectors
export const getDraftList = (state:RootState) => {
  console.log(state.draftlist)
  return state.draftlist
}