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
    turnNumber: number,
    turn: 'Red' | 'Blue'| 'Done',
    champList: string[][],
    topList:string[][],
    jgList:string[][],
    midList:string[][],
    bottomList:string[][],
    supportList:string[][],
}

export interface ChampSelection {
    name: string,
    icon: string
}

export interface Timer {
    seconds: number
}

export interface DraftRequest {
    requestBody: DraftList | Timer
}


