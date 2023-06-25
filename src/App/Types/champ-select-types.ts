export interface Summoner {
    name:string|null,
    champ: string|null,
    icon: string
}

export interface Ban {
    champ: string | null,
    icon: string 
}

export type Channel = string

export interface DraftListRequest {
    banlist: Ban[],
    summonerlist: Summoner[]
    channel: Channel
}

export interface DraftList{
    banlist: Ban[],
    summonerlist: Summoner[]
}


export interface ChampSelection {
    name: string,
    icon: string
}