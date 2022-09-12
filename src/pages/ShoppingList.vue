<template>
  <q-page class="q-ma-sm">
    Shopping List

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from 'src/stores/mainStore'
import { useSqlDatabase } from 'src/stores/sqlStorage'
import { ShoppingListItem } from 'src/stores/model'

const router = useRouter()
const store = useMainStore()
const { db } = useSqlDatabase()

onMounted(async () => {
  // load data
  // shoppingList

  // Check if we are back from the selection mode.
  await handleSelection()
})

async function handleSelection() {
  // get the selected product from the state store
  if (!store.selectedProduct) return

  //let productId: number = toRaw(store.selectProduct)
  let productId: number = store.selectedProduct
  // console.log('selected product', store.selectedProduct, 'raw:', productId)
  // add the product to the shopping list
  var item = new ShoppingListItem(productId)
  // var item = db.shoppingList.newRecord(productId)
  //console.log(item instanceof ShoppingListItem)

  debugger

  await db.shoppingList.add(item)

  // clear the state
  store.selectProduct(null)
}

function onFabClick() {
  router.push({ name: 'Product List', params: { selection: true } })
}
</script>
  