export interface Ban {
    champ: string | null,
    icon: string 
}

export interface Summoner {
    name: string,
    role: string,
    champ: string,
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


