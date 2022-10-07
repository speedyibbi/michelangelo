import React, { ReactElement } from 'react'
// interfaces
import Game from '../interfaces/GameInterface'

const GameItem = (props: Game): ReactElement => {
  return (
    <a href="" className='GameItem'>
        <p className='GameItem__name'>{props.name}</p>
        <p className='GameItem__rating'>{props.total_rating}</p>
    </a>
  )
}

export default GameItem
