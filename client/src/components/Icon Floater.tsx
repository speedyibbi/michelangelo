import React, { ReactElement, useEffect, useState } from 'react'

const Nav = (): ReactElement => {
  const [elements, setElements] = useState<ReactElement[]>()

  const imageName: string[] = [
    'Black Mage', 'Bomberman', 'Conker', 'Crash Bandicoot', 'Dashing Prince',
    'Donkey Kong', 'Doom Slayer', 'Hat Kid', 'IKE', 'Isaac Clarke', 'Isabelle',
    'Joker', 'Kirby', 'Kratos', 'Mario', 'Master Chief', 'Mega Man', 'Monokuma',
    'Nights', 'Pac-Man', 'Parappa', 'Pea Shooter', 'Pikachu', 'Pipo Monkey',
    'Samus Aran', 'Shantae', 'Sly Cooper', 'Solid Snake', 'Sonic', 'Spyro',
    'T-45 Power Armor', 'Viewtiful Joe'
  ]

  useEffect(() => {
    const elements: ReactElement[] = []
    for (let i = 32; i < 72; i++) {
      if (elements != null) {
        elements.push(React.createElement('div',
          { key: `${i}` }))
      }
    }
    for (let i = 0; i < 32; i++) {
      if (elements != null) {
        elements.push(React.createElement('img', {
          src: `/images/characters/${imageName[i]}.png`,
          className: 'w-7/12 m-auto',
          key: `${i}`
        }))
      }
    }
    elements.sort(() => Math.random() - 0.5)
    setElements(elements)
  }, [])

  return (
        <div className='h-full relative border-t-2 border-b-2 border-primary overflow-hidden'>
          <div className='h-full absolute bottom-full grid grid-rows-6 grid-cols-12 animate-gridshift'>
          {elements}
          </div>
          <div className='h-full absolute grid grid-rows-6 grid-cols-12 animate-gridshift'>
          {elements}
          </div>
        </div>
  )
}

export default Nav
