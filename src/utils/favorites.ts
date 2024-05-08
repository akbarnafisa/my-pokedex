import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

export const useFavorites = () => {
  const { data } = useIDBKeyval('favorited-pokemon', {
    favorited: new Set<string>(),
  })

  const toggleFavorite = (id: string) => {
    data.value.favorited.has(id)
      ? data.value.favorited.delete(id)
      : data.value.favorited.add(id)
  }

  const isFavorited = (id: string) => data.value.favorited.has(id)

  return {
    toggleFavorite,
    isFavorited,
  }
}
