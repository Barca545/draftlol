import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DraftList } from '../Types/champ-select-types'

const initialState:DraftList = {
    banlist: [
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
    ],
    summonerlist: [
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
    ] 
}

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