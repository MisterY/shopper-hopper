<template>
  <q-page class="q-ma-sm">
    <!-- <q-toolbar>
      <q-toolbar-title>Products</q-toolbar-title>
    </q-toolbar> -->
    <p>Products</p>

    <div>Selection mode: {{ isSelectionMode }}</div>

    <q-list>
      <q-item v-for="product in products" :key="product?.id">
        <q-item-section @click="onProductClick(product.id)">{{
          product?.name
        }}</q-item-section>
        <q-item-section side @click="edit(product.id)">
          <q-icon name="edit" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useMainStore } from 'src/stores/mainStore'
import { db } from '../stores/persistentStorage'

const route = useRoute()
const router = useRouter()
const store = useMainStore()

const isSelectionMode = ref(false)
const products = ref([])

onMounted(async () => {
  // selection mode?
  let selectionString = route.params.selection
  isSelectionMode.value = selectionString === 'true'

  await loadData()
})

function edit(productId) {
  router.push({ name: 'Product Editor', params: { id: productId } })
}

async function loadData() {
  try {
    products.value = await db.products.toArray()
  } catch (err) {
    console.error(err)
  }
}

function onFabClick() {
  router.push({ name: 'Product Editor' })
}

async function onProductClick(productId) {
  if (isSelectionMode.value) {
    // return the product id if in selection mode.
    store.selectProduct(productId)
    await router.push({ name: 'Shopping List' })
  } else {
    // Otherwise, edit record.
    edit(productId)
  }
}
</script>
      