<template>
  <Navbar />
  <div class="my-24 max-w-5xl mx-auto px-2">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/common/Navbar.vue'
</script>
