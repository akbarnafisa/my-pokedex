<template>
  <section>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else-if="pokemonData === undefined || isError">
      Fail to fetch data
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
import { useFetchPokemonTypes } from '@/utils/request'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const currentTypeId = computed(() => {
  return route.query.id as string
})

const { data, isLoading, isError } =
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
