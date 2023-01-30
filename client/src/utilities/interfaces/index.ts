export interface Game {
  id: string
  title: string
  description: string
  image: string
  creator: string
}

export interface Quote {
  body: string
  game: string
}
