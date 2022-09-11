<template>
  <q-page class="q-ma-sm">
    Shopping List

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSqlDatabase } from '../stores/sqlStorage'

const router = useRouter()
const { db } = useSqlDatabase()

onMounted(async () => {
  // load data
  // shoppingList
})

function onFabClick() {
  router.push({ name: 'Product List', params: { edit: true } })
}
</script>
  