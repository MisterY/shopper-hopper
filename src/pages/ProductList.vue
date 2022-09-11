<template>
  <q-page>
    Products

    <div>Selection mode: {{ isSelectionMode }}</div>

    <q-list>
      <q-item v-for="product in products" :key="product?.id">
        <q-item-section>{{ product?.name }}</q-item-section>
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

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
// import { db } from '../stores/persistentStorage'
import { useSqlDatabase } from 'src/stores/sqlStorage'

const route = useRoute()
const router = useRouter()
const { db } = useSqlDatabase()

const isSelectionMode = ref(false)
const products = ref([])

onMounted(async () => {
  // selection mode?
  isSelectionMode.value = route.params.selection

  await loadData()
})

function edit(productId) {
  router.push({ name: 'Product Editor', params: { id: productId } })
}

async function loadData() {
  try {
    //products.value = await db.products.toArray();
    products.value = await db.products.all()
  } catch (err) {
    console.error(err)
  }
}

function onFabClick() {
  router.push({ name: 'Product Editor' })
}
</script>
      