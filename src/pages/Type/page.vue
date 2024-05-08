<template>
  <section>
    <div v-if="isLoading" class="pt-20">
      <Spinner />
    </div>
    <div v-else-if="pokemonData === undefined || isError">
      <p>There was an issue loading the Pokémon. Please try again.</p>
      <Button @click="refetch"> Retry </Button>
    </div>
    <template v-else>
      <SelectType :currentType="currentTypeId" />
      <PokeCardList :data="pokemonData" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import PokeCardList from '@/components/ui/PokeCardList.vue'
import Spinner from '@/components/ui/Spinner.vue'

import SelectType from '@/components/ui/SelectType.vue'
import { useFetchPokemonTypes } from '@/hooks/request'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Button from '@/components/ui/Button.vue'

const route = useRoute()

const currentTypeId = computed(() => {
  return route.query.id as string
})

const { data, isLoading, isError, refetch } =
  useFetchPokemonTypes(currentTypeId)

const pokemonData = computed(() => {
  return data.value?.pokemon.map((item: any) => {
    return {
      name: item.pokemon.name,
      url: item.pokemon.url,
    }
  })
})
</script>
