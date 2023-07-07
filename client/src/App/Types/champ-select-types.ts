import { PositionSelect } from "./role-select-types"

export interface Ban {
    champ: string|null,
    icon: string
}

export interface Summoner {
    summonerName: string,
    role: string,
    champion: string,
    icon: string,
}

export interface DraftList{
    bluePicks: Summoner[],
    redPicks: Summoner[],
    redBans: Ban[],
    blueBans: Ban[],
    turnNumber: number,
    turn: 'Red' | 'Blue'| 'Done',
    champList: string[][],
    topList:string[][],
    jgList:string[][],
    midList:string[][],
    bottomList:string[][],
    supportList:string[][],
}

export function isDraft(requestBody: DraftList| null):requestBody is DraftList {
    return (requestBody as DraftList)!== null
}

export interface ChampSelection {
    name: string,
    icon: string
}

export interface PickBanIndex {
    pickNumber: number,
    banNumber:number
}

export interface Timer {
    seconds: number
}

export function isTimer(requestBody: Timer | DraftList| null):requestBody is Timer {
    return (requestBody as Timer).seconds !== undefined
}