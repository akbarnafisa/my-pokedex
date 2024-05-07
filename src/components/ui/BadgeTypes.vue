<template>
  <li
    class="capitalize rounded-full text-xs font-bold px-3 py-1"
    :class="colorScheme"
  >
    {{ type }}
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

const pokemonTypeColors: Record<string, string> = {
  normal: 'bg-gray-300 text-gray-800',
  fighting: 'bg-red-600 text-white',
  flying: 'bg-blue-300 text-blue-800',
  poison: 'bg-purple-600 text-white',
  ground: 'bg-yellow-600 text-white',
  rock: 'bg-gray-700 text-white',
  bug: 'bg-green-500 text-white',
  ghost: 'bg-indigo-600 text-white',
  steel: 'bg-gray-400 text-gray-800',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-green-600 text-white',
  electric: 'bg-yellow-300 text-yellow-800',
  psychic: 'bg-pink-500 text-white',
  ice: 'bg-blue-200 text-blue-700',
  dragon: 'bg-indigo-800 text-white',
  dark: 'bg-gray-800 text-white',
  fairy: 'bg-pink-200 text-pink-700',
  stellar: 'bg-yellow-500 text-gray-800',
  unknown: 'bg-gray-200 text-gray-700',
}

const colorScheme = pokemonTypeColors[props.type]
</script>

<style scoped></style>
