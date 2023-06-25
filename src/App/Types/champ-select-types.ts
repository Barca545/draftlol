interface Summoner {
    name:string|null,
    champ: string|null,
    icon: string
}

interface Ban {
    champ: string | null,
    icon: string 
}

export interface BlueSummonerList{
    banlist: Ban[],
    summonerlist: Summoner[] 
    
}

export interface RedSummonerList{
    summonerlist: Summoner[]      
}

export interface ChampSelection {
    name: string,
    icon: string
}