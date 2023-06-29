import { DraftList } from "../Types/champ-select-types";
import { initalTop } from "./initialTop";
import { initalMid } from "./initalMid";
import { initalJungle } from "./initalJungle";
import { intialBottom } from "./initalBottom"; 
import { initialSupport } from "./initialSupport"; 
import { initalAllChamps } from "./initalAllChamps";

export const initialDraftList:DraftList = {
    blueBanlist: [
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    blueSummonerlist: [
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    redBanlist: [
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    redSummonerlist: [
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {name:null,champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    blueTurn: true,
    champList:initalAllChamps,
    topList:initalTop,
    jgList:initalJungle,
    midList:initalMid,
    bottomList:intialBottom,
    supportList:initialSupport,
    ResetTimer: false,
}