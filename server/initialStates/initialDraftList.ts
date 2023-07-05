import { DraftList } from "../types/champ-select-types"
import { initalTop } from "./initialTop";
import { initalMid } from "./initalMid";
import { initalJungle } from "./initalJungle";
import { intialBottom } from "./initalBottom"; 
import { initialSupport } from "./initialSupport"; 
import { initalAllChamps } from "./initalAllChamps";

export const initialDraftList:DraftList = {
    blueBans: [
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    bluePicks: [
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},

    ],
    redBans: [
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    redPicks: [
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    turn: 'Blue',
    phase: 'Ban',
    champList:initalAllChamps,
    topList:initalTop,
    jgList:initalJungle,
    midList:initalMid,
    bottomList:intialBottom,
    supportList:initialSupport,
}