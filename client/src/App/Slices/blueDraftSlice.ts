import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store'
import {draftList} from '../../App//InitialStates/initialDraftList'
import { DraftList,Summoner,Ban } from '../Types/champ-select-types'

const initialState:DraftList = draftList

export const blueDraftSlice = createSlice({
    name: 'blueDraft',
    initialState: initialState,
    reducers:{
        setBlueSummoners: (state,action:PayloadAction<Summoner[]>) => {
            state.blueSummonerlist = action.payload
        },
        setBlueBans: (state,action:PayloadAction<Ban[]>) => {
            state.blueBanlist = action.payload
        },
    }
})

export const {setBlueSummoners,setBlueBans} = blueDraftSlice.actions;
export default blueDraftSlice.reducer;

///Selectors
export const getBlueDraftState = (state:RootState) => {
    return state.blueDraft
}