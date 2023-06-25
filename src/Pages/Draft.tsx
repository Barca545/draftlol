import '../Pages/draft-styles.css'

const list = ['garen','anivia','annie','cassiopea','syndra']

const ChampList = () => {
  return(
    <div className='champ-list'>
      {list.map((item)=><div className='champion' id={item}>{item}</div>)}
    </div>
  )
}

export const Draft = () => {
  return( 
    <div className="grid-container">
      <div className="blue-side">
        <div className='blue-summoner-1'>
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
    </div>
  )
}