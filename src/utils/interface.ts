export interface PokemonMainQuery {
  count: number
  next: null | string
  previous: null | string
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonDetailQuery {
  abilities: {
    ability: {
      name: string
    }
  }[]
  height: number
  id: number
  name: string
  sprites: {
    front_default: string
  }
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
  weight: number
}


export type CardListType = {
  id: string,
  name: string
  image: string
  favorited: boolean
  types: string[]
}