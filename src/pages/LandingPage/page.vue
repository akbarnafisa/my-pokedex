<template>
  <section>
    <div v-if="isLoading" class="pt-20">
      <Spinner />
    </div>
    <div
      v-else-if="data === undefined || isError"
      class="flex items-center flex-col pt-20 gap-2"
    >
      <p>There was an issue loading the Pokémon. Please try again.</p>
      <Button @click="refetch"> Retry </Button>
    </div>
    <template v-else>
      <SelectType />
      <div v-for="group in data.pages">
        <PokeCardList :data="group.results" />
      </div>
      <div ref="bottomPage"></div>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { ref, watch } from 'vue'

import PokeCardList from '@/components/ui/PokeCardList.vue'
import Spinner from '@/components/ui/Spinner.vue'

import { useFetchLandingPage } from '@/hooks/request'
import SelectType from '@/components/ui/SelectType.vue'
import Button from '@/components/ui/Button.vue'

const {
  data,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  refetch,
} = useFetchLandingPage()

const bottomPage = ref(null)
const targetIsVisible = ref(false)

useIntersectionObserver(bottomPage, ([{ isIntersecting, time }]) => {
  if (time > 1000) {
    targetIsVisible.value = isIntersecting
  }
})

watch(targetIsVisible, async newValue => {
  if (newValue && hasNextPage.value) {
    fetchNextPage()
  }
})
</script>
