import { useState } from 'react'
import '../Pages/draft-styles.css'
import { champlist } from './temp-champ-list'
import { ChampSelection } from '../App/Types/champ-select-types'

/*
need the champ select boxes to be constant size
lock in/confirm button
ban display
three links (draft captains + spectator)  

*/

export const Draft = () => {
  const [summoner, setSummoner] = useState<ChampSelection>({name:'HelmetBro',icon:'https://draftlol.dawe.gg/rectangle.png'})
  
  const ChampList = () => {
    return(
      <div className='champ-list'>
        {champlist.map((item)=>{
          return(
            <div className='champion' id={item[0]} onClick={()=>{setSummoner({name:item[0],icon:item[1]})}}>
              <img src={item[1]}/>
            </div>
          )})}
      </div>
    )
  }
  
  return( 
    <div className="grid-container">
      <div className='lane-select'>
       <input type='button' value={'TOP'}/>
       <input type='button' value={'JUNGLE'}/>
       <input type='button' value={'MID'}/>
       <input type='button' value={'ADC'}/>
       <input type='button' value={'SUPPORT'}/>
      </div>
      <div className="blue-side">
        <div className='blue-summoner-1'>
          <img className='champselect-image' src={summoner.icon}/>
        </div>
        <div className='blue-summoner-2'>
        </div>
        <div className='blue-summoner-3'>
        </div>
        <div className='blue-summoner-4'>
        </div>
        <div className='blue-summoner-5'>
        </div>
      </div>
      <div className="champ-select">
        <ChampList/>
      </div>
      <div className="red-side">
        <div className='red-summoner-1'>
        </div>
        <div className='red-summoner-2'>
        </div>
        <div className='red-summoner-3'>
        </div>
        <div className='red-summoner-4'>
        </div>
        <div className='red-summoner-5'>
        </div>
      </div>
      <div className='blue-side-bans'>
        <div>Blue Bans</div>
      </div>
      <div className='red-side-bans'>
        <div>Red Bans</div>
      </div>
      <div className='lock-button'>
        <input className='confirm-button' type='button' value={'confirm'}/>
      </div>
    </div>
  )
}