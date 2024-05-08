<template>
  <section>
    <div v-if="!pokemonData || pokemonData.length === 0">
      Fail to fetch data
    </div>
    <template v-else>
      <PokeCardList :data="pokemonData" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import PokeCardList from '@/components/ui/PokeCardList.vue'

import { POKEAPI_URL } from '@/utils/request'
import { useFavorites } from '@/utils/favorites'

const { getFavorites } = useFavorites()

const pokemonData = computed(() => {
  return getFavorites().map(fav => ({
    name: fav,
    url: `${POKEAPI_URL}/pokemon/${fav}/`,
  }))
})
</script>
