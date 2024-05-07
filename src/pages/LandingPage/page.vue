<template>
  <div>
    <div v-if="pokemonData.length === 0">
      <Spinner />
    </div>
    <template v-else>
      <PokeCardList :data="pokemonData" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import PokeCardList from '@/components/ui/PokeCardList.vue'
import Spinner from '@/components/ui/Spinner.vue'

import { onMounted, ref } from 'vue'
import {
  PokemonMainQuery,
  PokemonDetailQuery,
  CardListType,
} from '@/utils/interface'

const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'

const pokemonData = ref<CardListType[]>([])

const fetchData = async () => {
  const response = await fetch(url)
  const res = (await response.json()) as PokemonMainQuery

  pokemonData.value = await getPokemonData(res.results)
}
const getPokemonData = async (res: PokemonMainQuery['results']) => {
  const promises = res.map(item => {
    return fetch(item.url)
      .then(response => response.json())
      .then((results: PokemonDetailQuery) => {
        return {
          id: String(results.id),
          name: results.name,
          image: results.sprites.front_default,
          favorited: false,
          types: results.types.map(item => item.type.name),
        }
      })
  })

  const results = await Promise.all(promises)
  return results
}

onMounted(() => {
  fetchData()
})
</script>
