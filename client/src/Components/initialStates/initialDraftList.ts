import { DraftList } from "../../App/Types/champ-select-types";
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
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},

    ],
    redBans: [
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
        {champ:null,icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    redPicks: [
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
        {summoner:null, champ:'',icon:"https://draftlol.dawe.gg/rectangle.png"},
    ],
    turnNumber: 0,
    turn: 'Blue',
    champList:initalAllChamps,
    topList:initalTop,
    jgList:initalJungle,
    midList:initalMid,
    bottomList:intialBottom,
    supportList:initialSupport,
    ///TEST PLAYERS
    players:[
        {name:'Fish',role:'TOP'},
        {name:'Ouken',role:'JUNGLE'},
        {name:'HappyBlueGuy',role:'MIDDLE'},
        {name:'Envoker',role:'BOTTOM'},
        {name:'adc',role:'SUPPORT'},
    ]
}