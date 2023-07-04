export interface Summoner {
    champ: string|null,
    icon: string
}

export interface Ban {
    champ: string | null,
    icon: string
}

export interface DraftList{
    blueBans: Ban[],
    bluePicks: Summoner[],
    redBans: Ban[],
    redPicks: Summoner[],
    phase: 'Pick' | 'Ban'
    turn: 'Blue'|'Red',
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