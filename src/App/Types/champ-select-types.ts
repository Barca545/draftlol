export interface Summoner {
    name:string|null,
    champ: string|null,
    icon: string
}

interface Ban {
    champ: string | null,
    icon: string 
}

export interface DraftList{
    banlist: Ban[],
    summonerlist: Summoner[] 
    
}

export interface ChampSelection {
    name: string,
    icon: string
}