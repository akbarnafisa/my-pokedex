<template>
  <nav
    class="w-full items-center p-4 bg-white border-b border-gray-200 shadow-sm fixed left-0 top-0"
  >
    <div class="max-w-5xl flex justify-between mx-auto">
      <div class="flex items-center">
        <RouterLink class="flex" to="/">
          <Pokeball />
          <h1 class="ml-2 font-bold text-2xl">Pokedex</h1>
        </RouterLink>
      </div>
      <div>
        <RouterLink :to="currentRoute.url">
          <Button> {{ currentRoute.text }} </Button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Pokeball from '../icon/Pokeball.vue'
import Button from '@/components/ui/Button.vue'
import { computed } from 'vue'

const router = useRouter()

const currentRoute = computed(() => {
  const isFavorite = router.currentRoute.value.path === '/favorite'

  return isFavorite
    ? {
        url: '/',
        text: 'Home',
      }
    : {
        url: '/favorite',
        text: 'Favorite',
      }
})
</script>
