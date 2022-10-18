import React, { ReactElement, useEffect, useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import IconFloater from './components/Icon Floater'
import WebGLCanvas from './components/WebGL Canvas'

interface quoteInterface {
  body: string
  game: string
}

const App = (): ReactElement => {
  const [quote, setQuote] = useState<quoteInterface>()

  const quotes: quoteInterface[] = [
    {
      body: 'What is better? To be born good or to overcome your evil nature through great effort?',
      game: 'Paarthurnax, The Elder Scrolls V: Skyrim'
    },
    {
      body: 'The right man in the wrong place can make all the difference in the world.',
      game: 'G-Man, Half-Life 2'
    },
    {
      body: 'Wanting something does not give you the right to have it.',
      game: "Ezio Auditore, Assassin's Creed 2"
    },
    {
      body: 'What is a man but the sum of his memories? We are the stories we live! The tales we tell ourselves!',
      game: "Clay Kaczmarek, Assassin's Creed Brotherhood"
    },
    {
      body: "It's more important to master the cards you're holding than to complain about the ones your opponents were dealt.",
      game: 'Grimsley, Pokemon Black and White'
    },
    {
      body: 'War is where the young and stupid are tricked by the old and bitter into killing each other.',
      game: 'Niko Bellic, GTA 4'
    },
    {
      body: 'Hope is what makes us strong. It is why we are here. It is what we fight with when all else is lost.',
      game: 'Pandora, God of War 3'
    },
    {
      body: 'Steel wins battles. Gold wins wars.',
      game: 'Davion the Dragon Knight, DOTA 2'
    },
    {
      body: 'A sword wields no strength unless the hands that holds it has courage.',
      game: "The Hero's Shade, Legend of Zelda: Twilight Princess"
    },
    {
      body: 'No matter how dark the night, morning always comes, and our journey begins anew.',
      game: 'Lulu, Final Fantasy 10'
    }
  ]

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <section className='min-h-screen relative home-grid-custom bg-cover overflow-x-hidden'>
      <Nav />
      <article className='h-full grid grid-cols-2'>
        <p className='w-3/4 h-11/12 m-auto col-span-1 font-caviar
        text-white text-2xl text-center text-shadow-custom'>
            &quot;{ quote?.body }&quot; <br /> - { quote?.game }
            <br />
            <a href="https://www.igdb.com/api" target={'_blank'} rel="noreferrer"
            className='font-squids text-secondary underline remove-shadows-custom'>
                powered by <span className='text-amber-500'>IGDB</span>
            </a>
            <br />
            <button
            className='m-5 p-3 relative font-squids text-stone-800 text-lg rounded-md
            box-shadow-custom bg-primary transition-all animate-pulse
            hover:scale-110 hover:animate-none'>
              Explore Games</button>
        </p>
        <div className='mx-20 my-16'>
          <IconFloater />
        </div>
      </article>
      <Footer />
      <div className='w-full h-full absolute -z-10 hidden'>
        <WebGLCanvas />
      </div>
    </section>
  )
}

export default App
