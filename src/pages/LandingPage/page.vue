<template>
  <section>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else-if="data === undefined || isError">
      Fail to fetch data
    </div>
    <template v-else>
      <div v-for="group in data.pages">
        <PokeCardList :data="group" />
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

import { useFetchLandingPage } from '@/utils/request'

const { data, isLoading, isError, fetchNextPage, hasNextPage } =
  useFetchLandingPage()

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
