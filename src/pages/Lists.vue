<template>
  <q-page> Shopping Lists </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const lists = ref([])

onMounted(async () => {
  // todo: load shopping lists
})
</script>