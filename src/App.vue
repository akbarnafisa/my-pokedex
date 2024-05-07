<template>
  <Navbar />
  <div class="mt-20 max-w-5xl mx-auto">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/common/Navbar.vue'
</script>
