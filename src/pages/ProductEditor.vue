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
import { Product } from "src/stores/model";
import { onMounted, ref, toRaw } from "vue";
import { db } from "src/stores/persistentStorage";
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const product = ref(new Product());

onMounted(async () => {
  // todo: do we have an id?
  const id = route.params.id
  if (id) {
    // load record
    product.value = db.products.get(id)
  }
});

async function onFabClick() {
  // save
  const toSave = toRaw(product.value)
  await db.products.add(toSave);

  router.back()
}
</script>