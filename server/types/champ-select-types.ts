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
    time:number
}

