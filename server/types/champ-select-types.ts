export interface Summoner {
    name:string|null,
    champ: string|null,
    icon: string
}

export interface Ban {
    champ: string | null,
    icon: string 
}

export interface DraftList{
    blueBanlist: Ban[],
    blueSummonerlist: Summoner[],
    redBanlist: Ban[],
    redSummonerlist: Summoner[],
    blueTurn: boolean,
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
    ///minutes: number,
    seconds: number
}

export interface DraftRequest {
    requestBody: DraftList | Timer
}

export function isTimer(requestBody: Timer | DraftList):requestBody is Timer {
    return (requestBody as Timer).seconds !== undefined
}
