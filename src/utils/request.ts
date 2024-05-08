import { useQuery } from '@tanstack/vue-query'
import { PokemonDetailQuery, PokemonMainQuery } from './interface'

export const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon'

const fetcher = async<T> (path: string): Promise<T> =>
  await fetch(path).then(
    (response) => response.json(),
  )

export const useFetchLandingPage = () => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['landingPage'],
    queryFn: () => fetcher<PokemonMainQuery>(`${POKEAPI_URL}?limit=21&offset=0`),
    staleTime: 3000,
  })

  return { isError, isLoading, data, error, refetch }
}

export const useFetchDetailPage = (url: string) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: [url],
    queryFn: () => fetcher<PokemonDetailQuery>(url),
    staleTime: 3000,
  })

  return { isError, isLoading, data, error, refetch }
}
