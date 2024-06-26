<template>
  <section>
    <div v-if="isLoading" class="pt-20">
      <Spinner />
    </div>
    <div
      v-else-if="displayData === null || isError"
      class="flex items-center flex-col pt-20 gap-2"
    >
      <p>There was an issue loading the Pokémon. Please try again</p>
      <Button @click="refetch"> Retry </Button>
    </div>

    <article
      v-else
      class="bg-white p-4 md:p-6 rounded-lg border gap-6 flex flex-col md:flex-row"
    >
      <figure
        class="flex-1 bg-gray-100 flex items-center justify-center rounded-lg"
      >
        <img :src="displayData.image" alt="pokemon" class="w-36" />
      </figure>
      <div class="flex-1">
        <section class="mb-4">
          <div class="flex items-center justify-between">
            <h2 class="capitalize text-2xl font-bold">
              {{ displayData.name.replace('-', ' ') }} #{{
                displayData.id
              }}
            </h2>
            <button>
              <IconHearth
                :isFavorited="isPokemonFavorited"
                @click="() => toggleFavorite(String(displayData?.id))"
              />
            </button>
          </div>

          <ul class="flex gap-1 mt-2">
            <BadgeTypes
              v-for="item in displayData.types"
              :key="item.type"
              :type="item.type"
              :url="item.url"
            />
          </ul>
        </section>

        <section class="mb-3">
          <h3 class="font-bold mb-2 text-lg">Breeding</h3>
          <div class="flex gap-3">
            <div
              class="px-5 py-3 flex items-center gap-2 border rounded-lg"
            >
              <IconWeight />
              {{ displayData.weight / 10 }}kg
            </div>
            <div
              class="px-5 py-3 flex items-center gap-2 border rounded-lg"
            >
              <IconHeight />
              {{ displayData.height / 10 }}m
            </div>
          </div>
        </section>

        <section class="mb-3">
          <h3 class="font-bold mb-2 text-lg">Abilities</h3>
          <ul class="flex gap-3">
            <li
              class="px-5 py-3 flex items-center gap-2 border rounded-lg capitalize"
              v-for="item in displayData.abilities"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="mb-3">
          <h3 class="font-bold mb-2 text-lg">Base Stats</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="item in displayData.stats" :key="item.name">
              <div class="capitalize mb-1">{{ item.name }}</div>
              <div
                class="h-5 rounded-full bg-emerald-100 relative overflow-hidden w-full border border-emerald-200"
              >
                <div
                  class="absolute left-0 top-0 bg-emerald-600 h-full rounded-full text-sm text-white font-bold text-right px-2"
                  :style="{
                    width: `${item.base_stat}%`,
                  }"
                >
                  {{ item.base_stat }}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Spinner from '@/components/ui/Spinner.vue'
import IconHeight from '@/components/icon/IconHeight.vue'
import IconWeight from '@/components/icon/IconWeight.vue'
import BadgeTypes from '@/components/ui/BadgeTypes.vue'
import IconHearth from '@/components/icon/IconHearth.vue'
import { useFetchPokemonDetail, POKEAPI_URL } from '@/hooks/request'
import { useFavorites } from '@/utils/favorites'
import Button from '@/components/ui/Button.vue'

const route = useRoute()

const {
  data: pokemonData,
  isLoading,
  isError,
  refetch,
} = useFetchPokemonDetail(
  `${POKEAPI_URL}/pokemon/${route.params.id}/`
)

const displayData = computed(() => {
  if (pokemonData.value === undefined) return null

  return {
    id: String(pokemonData.value.id),
    name: pokemonData.value.name,
    image: pokemonData.value.sprites.front_default,
    favorited: false,
    types: pokemonData.value.types.map(item => ({
      type: item.type.name,
      url: item.type.url,
    })),
    weight: pokemonData.value.weight,
    height: pokemonData.value.height,
    stats: pokemonData.value.stats.map(item => {
      return {
        name: item.stat.name.replace('-', ' '),
        base_stat: item.base_stat,
      }
    }),
    abilities: pokemonData.value.abilities.map(item =>
      item.ability.name.replace('-', ' ')
    ),
  }
})

const { isFavorited, toggleFavorite } = useFavorites()

const isPokemonFavorited = computed(() => {
  return isFavorited(String(displayData.value?.id))
})
</script>

<style scoped></style>
