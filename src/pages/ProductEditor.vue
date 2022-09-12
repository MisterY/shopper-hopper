<template>
  <q-page class="q-ma-sm">
    Product Editor

    <q-input label="Product Name" v-model="product.name" />
    <q-input label="Description" v-model="product.description" />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="check" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { Product } from 'src/stores/model'
import { onMounted, ref, toRaw } from 'vue'
// import { db } from 'src/stores/persistentStorage'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useSqlDatabase } from 'src/stores/sqlStorage'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const { db } = useSqlDatabase()

const product = ref(new Product())
console.debug(product.value)

onMounted(async () => {
  // todo: do we have an id?
  const idStr = route.params.id
  if (idStr) {
    const id = Number(idStr)
    console.debug('loading product', id)

    // load record
    await loadProduct(id)
  }
})

async function loadProduct(id) {
  //console.debug("id", typeof id);
  product.value = await db.products.get(id)

  $q.notify('record loaded')
}

async function onFabClick() {
  // save
  saveProduct()
}

async function saveProduct() {
  try {
    const toSave = toRaw(product.value)
    //await db.products.put(toSave)
    await db.products.add(toSave)

    $q.notify('record saved')

    await router.back()
  } catch (err) {
    $q.notify(err)
  }
}
</script>