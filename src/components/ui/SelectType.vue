<template>
  <div class="w-40 mb-4 ml-auto text-right">
    <label
      for="HeadlineAct"
      class="block text-sm font-bold text-gray-900"
    >
      Filter by type
    </label>

    <select
      name="HeadlineAct"
      id="HeadlineAct"
      class="cursor-pointer border custom-select mt-1.5 py-2 pl-3 pr-10 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      @change="handleFilterType"
      :value="
        currentType
          ? `https://pokeapi.co/api/v2/type/${currentType}/`
          : null
      "
    >
      <option value="">Please select</option>
      <option
        v-for="item in data?.results"
        :key="item.name"
        :value="item.url"
        class="cursor-pointer"
      >
        {{ capitalize(item.name) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useFetchTypeList } from '@/hooks/request'
import { useRouter } from 'vue-router'

defineProps({
  currentType: {
    type: String,
    default: '',
  },
})

const { data } = useFetchTypeList()
const router = useRouter()

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const handleFilterType = (e: Event) => {
  const url = (e.target as HTMLSelectElement).value
  let parts = url.split('/')
  parts.pop()
  let id = parts[parts.length - 1]
  router.push({
    name: 'type',
    query: {
      id,
    },
  })
}
</script>

<style scoped>
.custom-select {
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="gray" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 7l3-3 3 3m0 6l-3 3-3-3" /></svg>');
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em;
}
</style>
