<template>
  <article>
    <div v-if="isLoading" class="pt-10">
      <Spinner />
    </div>
    <div v-else-if="data === undefined || isError">
      Fail to fetch data
    </div>
    <div
      v-else
      class="bg-white px-3 pt-3 rounded-lg border hover:shadow-lg transition duration-200 ease-in-out"
    >
      <RouterLink :to="`/detail/${data.id}`">
        <figure
          class="bg-gray-100 rounded-lg flex items-center justify-center h-36"
        >
          <img
            :src="data.sprites.front_default"
            :alt="data.sprites.front_default"
          />
        </figure>
      </RouterLink>

      <section class="pb-5 pt-3">
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-xl capitalize">
            {{ data.name.replace('-', ' ') }} #{{ data.id }}
          </h2>
          <button>
            <IconHearth
              :isFavorited="isPokemonFavorited"
              @click="() => toggleFavorite(String(data?.id))"
            />
          </button>
        </div>
        <div>
          <ul class="flex gap-1 mt-2">
            <BadgeTypes
              v-for="item in data.types"
              :key="item.type.name"
              :type="item.type.name"
              :url="item.type.url"
            />
          </ul>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import IconHearth from '@/components/icon/IconHearth.vue'
import BadgeTypes from './BadgeTypes.vue'
import { useFetchPokemonDetail } from '@/hooks/request'
import Spinner from './Spinner.vue'
import { useFavorites } from '@/utils/favorites'
import { computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, isLoading, isError } = useFetchPokemonDetail(props.url)

const { isFavorited, toggleFavorite } = useFavorites()

const isPokemonFavorited = computed(() => {
  return isFavorited(String(data.value?.id))
})
</script>

<style scoped></style>
