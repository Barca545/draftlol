export interface Summoner {
    ///change name to role
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
    blueTurn: boolean
}


export interface ChampSelection {
    name: string,
    icon: string
}

///possibly delete
export type Channel = string

export interface DraftListRequest {
    banlist: Ban[],
    summonerlist: Summoner[]
    channel: Channel
}