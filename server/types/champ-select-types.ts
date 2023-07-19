export interface Summoner {
    name: string,
    role: 'TOP'|'JUNGLE'|'MIDDLE'|'BOTTOM'|'SUPPORT'
  }

export interface Ban {
    champ: string | null,
    icon: string 
}

export interface Pick {
    summoner: Summoner|null 
    champ: string,
    icon: string,
}

export interface DraftList{
    bluePicks: Pick[],
    redPicks: Pick[],
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
    players:Summoner[]
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


