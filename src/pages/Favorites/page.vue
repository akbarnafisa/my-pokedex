<template>
  <section>
    <div
      v-if="!pokemonData || pokemonData.length === 0"
      class="flex items-center flex-col pt-20 gap-2"
    >
      <p>
        No favorites yet. Visit the main page to select your top
        Pokémon!
      </p>
      <Button @click="goToHomePage"> Home </Button>
    </div>
    <template v-else>
      <PokeCardList :data="pokemonData" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import PokeCardList from '@/components/ui/PokeCardList.vue'

import { POKEAPI_URL } from '@/hooks/request'
import { useFavorites } from '@/utils/favorites'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'

const { getFavorites } = useFavorites()
const router = useRouter()

const pokemonData = computed(() => {
  return getFavorites().map(fav => ({
    name: fav,
    url: `${POKEAPI_URL}/pokemon/${fav}/`,
  }))
})

const goToHomePage = () => {
  router.push('/')
}
</script>
