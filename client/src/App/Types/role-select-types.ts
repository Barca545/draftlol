export interface PositionSelect {
  summoner: string,
  role: 'TOP'|'JUNGLE'|'MIDDLE'|'BOTTOM'|'SUPPORT'
  champion: string | null
}