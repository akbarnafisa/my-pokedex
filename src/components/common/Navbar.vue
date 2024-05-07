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
        <RouterLink to="/favorite">
          <Button> Favorite </Button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Pokeball from '../icon/Pokeball.vue'
import Button from '@/components/ui/Button.vue'
</script>
