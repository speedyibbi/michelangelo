import React, { ReactElement } from 'react'
// interfaces
import game from '../interfaces/GameInterface'
// components
import Loader from './Loader'
import GameItem from './GameItem'

const MultiGameDisplay = (props: { games: game[] | null}): ReactElement => {
  const width = window.innerWidth

  if (props.games === null) {
    if (width < 1024) {
      return (
        <Loader bar = { false } />
      )
    } else {
      return (
        <Loader bar = { true } />
      )
    }
  } else {
    return (
      <>
        <ul className='MultiGameDisplay'>
            {props.games.map((game: game) => {
              return (
                <li key={game.id} style={{ backgroundImage: `url(https:${game.image ?? ''})` }}>
                  <GameItem id={game.id} name={game.name} total_rating={game.total_rating} />
                </li>
              )
            })}
        </ul>
      </>
    )
  }
}

export default MultiGameDisplay
