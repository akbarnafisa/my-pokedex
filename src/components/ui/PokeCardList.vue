<template>
  <div class="card-wrapper">
    <PokeCard
      v-for="item in props.data.results"
      :url="item.url"
      :key="item.name"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import PokeCard from './PokeCard.vue'
import { PokemonMainQuery } from '@/utils/interface'

const props = defineProps({
  data: {
    type: Object as PropType<PokemonMainQuery>,
    required: true,
  },
})
</script>

<style scoped>
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 18px;
}

@media (max-width: 768px) {
  .card-wrapper {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 12px;
  }
}

@media (max-width: 410px) {
  .card-wrapper {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
}
</style>
