import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store'
import { BlueSummonerList } from '../Types/champ-select-types'

const initialState:BlueSummonerList = {
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

export const blueDraftSlice = createSlice({
    name: 'blueDraft',
    initialState: initialState,
    reducers:{}
})

export const {} = blueDraftSlice.actions;
export default blueDraftSlice.reducer;

///Selectors
export const getBlueDraftState = (state:RootState) => {
    return state.blueDraft
}