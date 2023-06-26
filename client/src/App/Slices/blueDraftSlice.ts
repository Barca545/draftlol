import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DraftList, Ban, Summoner } from '../Types/champ-select-types'

const initialState:DraftList = {
    blueBanlist: [
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
    ],
    blueSummonerlist: [
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
    ],
    redBanlist: [
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
    ],
    redSummonerlist: [
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
        {name:null,champ:null,icon:'https://draftlol.dawe.gg/rectangle.png'},
    ],
    blueTurn: true
}

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