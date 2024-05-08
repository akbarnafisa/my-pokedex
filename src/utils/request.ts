import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import {
  PokemonDetailQuery,
  PokemonMainQuery,
  PokemonTypeQuery,
} from './interface'
import { ComputedRef } from 'vue'

export const POKEAPI_URL = 'https://pokeapi.co/api/v2'
const LIMIT = 21

export const fetcher = async <T>(path: string): Promise<T> =>
  await fetch(path).then(response => response.json())

const fetchProjects = async ({
  pageParam = 0,
}): Promise<PokemonMainQuery> => {
  const res = await fetch(
    `${POKEAPI_URL}/pokemon?limit=${LIMIT}&offset=${pageParam * LIMIT}`
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

export const useFetchPokemonDetail = (url: string) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [url],
    queryFn: () => fetcher<PokemonDetailQuery>(url),
    staleTime: 3000,
    refetchOnWindowFocus: false,
  })

  return { isError, isLoading, data }
}

export const useFetchPokemonTypes = (id: ComputedRef<string>) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['pokemon-type', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetcher<PokemonTypeQuery>(`${POKEAPI_URL}/type/${id.value}`),
    staleTime: 3000,
  })

  return { isError, isLoading, data, refetch }
}

export const useFetchTypeList = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['pokemon-type-list'],
    queryFn: () => fetcher<PokemonMainQuery>(`${POKEAPI_URL}/type`),
    staleTime: 3000,
    refetchOnWindowFocus: false,
  })

  return { isError, isLoading, data }
}
