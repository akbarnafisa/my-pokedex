import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import { PokemonDetailQuery, PokemonMainQuery } from './interface'

export const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon'
const LIMIT = 21

const fetcher = async <T>(path: string): Promise<T> =>
  await fetch(path).then(response => response.json())

const fetchProjects = async ({
  pageParam = 0,
}): Promise<PokemonMainQuery> => {
  const res = await fetch(
    `${POKEAPI_URL}?limit=${LIMIT}&offset=${pageParam * LIMIT}`
  )
  return res.json() as Promise<PokemonMainQuery>
}

export const useFetchLandingPage = () => {
  const { data, fetchNextPage, isError, isLoading, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['pokemon'],
      queryFn: fetchProjects,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.next === null) return undefined
        return lastPageParam + 1
      },
      initialPageParam: 0,
      staleTime: Infinity,
    })

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  }
}

export const useFetchDetailPage = (url: string) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: [url],
    queryFn: () => fetcher<PokemonDetailQuery>(url),
    staleTime: 3000,
  })

  return { isError, isLoading, data, error, refetch }
}
