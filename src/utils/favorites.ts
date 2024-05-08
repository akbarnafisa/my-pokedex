import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

const { data } = useIDBKeyval('favorited-pokemon', {
  favorited: new Set<string>(),
})

export const useFavorites = () => {
  const toggleFavorite = (id: string) => {
    data.value.favorited.has(id)
      ? data.value.favorited.delete(id)
      : data.value.favorited.add(id)
  }

  const isFavorited = (id: string) => data.value.favorited.has(id)

  const getFavorites = () => Array.from(data.value.favorited)

  return {
    toggleFavorite,
    isFavorited,
    getFavorites,
  }
}
