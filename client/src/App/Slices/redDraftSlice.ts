import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DraftList } from '../Types/champ-select-types'
import {draftList} from '../../App//InitialStates/initialDraftList'

const initialState:DraftList = draftList

export const redDraftSlice = createSlice({
    name: 'redDraft',
    initialState: initialState,
    reducers:{
        setRedDraft: (state,action:PayloadAction<DraftList>) => {
            state = action.payload
        },
    }
})

export const {setRedDraft} = redDraftSlice.actions;
export default redDraftSlice.reducer;

///Selectors
export const getRedDraftState = (state:RootState) => {
    return state.redDraft
}