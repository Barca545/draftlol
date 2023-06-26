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
    ///targets: uuids of the other clients
    banlist: Ban[],
    summonerlist: Summoner[],
    blueTurn: boolean
}


export interface ChampSelection {
    name: string,
    icon: string
}