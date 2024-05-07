<template>
  <article class="bg-white px-3 pt-3 rounded-lg border">
    <RouterLink to="/favorite">
      <figure
        class="bg-gray-100 rounded-lg flex items-center justify-center h-36"
      >
        <img :src="$props.image" :alt="name" />
      </figure>
    </RouterLink>

    <section class="pb-5 pt-3">
      <div class="flex items-center justify-between">
        <h2 class="font-bold text-xl capitalize">
          {{ $props.name }}
        </h2>
        <button>
          <IconHearth />
        </button>
      </div>
      <div>
        <ul class="flex gap-1 mt-2">
          <BadgeTypes
            v-for="item in types"
            :key="item"
            :type="item"
          />
        </ul>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import IconHearth from '@/components/icon/IconHearth.vue'
import BadgeTypes from './BadgeTypes.vue'
import type { PropType } from 'vue'

defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  favorited: {
    type: Boolean,
    required: true,
  },
  types: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
})
</script>

<style scoped></style>
