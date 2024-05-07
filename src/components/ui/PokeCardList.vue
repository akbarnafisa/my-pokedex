<template>
  <div class="card-wrapper">
    <PokeCard
      v-for="item in props.data"
      :id="item.id"
      :key="item.name"
      :favorited="item.favorited"
      :name="item.name"
      :image="item.image"
      :types="item.types"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import PokeCard from './PokeCard.vue'
import { CardListType } from '@/utils/interface';

const props = defineProps({
  data: {
    type: Array as PropType<Array<CardListType>>,
    required: true,
  },
})
</script>

<style scoped>
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

@media (max-width: 1024px) {
  .card-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .card-wrapper {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 410px) {
  .card-wrapper {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
}
</style>
