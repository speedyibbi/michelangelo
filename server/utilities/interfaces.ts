export interface axiosConfigInterface {
  method: string
  url: string
  headers: { [key: string]: string }
  data: string
}

export interface filterInterface {
  sort?: string
  platform?: number | string
  genre?: number | string
  gameMode?: number | string
}

export interface gameInterface {
  id: number
  name?: string
  rating?: string
  cover?: string
}
