<template>
  <section>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else-if="data === undefined || isError">Fail to fetch data</div>
    <template v-else>
      <PokeCardList :data="data" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import PokeCardList from '@/components/ui/PokeCardList.vue'
import Spinner from '@/components/ui/Spinner.vue'

import { useFetchLandingPage } from '@/utils/request'

const { data, isLoading, isError } = useFetchLandingPage()

// const getPokemonData = async (res: PokemonMainQuery['results']) => {
//   const promises = res.map(item => {
//     return fetch(item.url)
//       .then(response => response.json())
//       .then((results: PokemonDetailQuery) => {
//         return {
//           id: String(results.id),
//           name: results.name,
//           image: results.sprites.front_default,
//           favorited: false,
//           types: results.types.map(item => item.type.name),
//         }
//       })
//   })

//   const results = await Promise.all(promises)
//   return results
// }
</script>
