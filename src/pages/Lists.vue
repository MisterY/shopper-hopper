<template>
  <q-page>
    Shopping Lists

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const lists = ref([])

onMounted(async () => {
  // todo: load shopping lists
})

function onFabClick() {
  router.push({ name: 'List Editor', params: { id: null } })
}
</script>