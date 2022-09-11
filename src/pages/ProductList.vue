<template>
  <q-page>
    Products

    <div>Edit mode: {{ isEditMode }}</div>

    <q-list>
      <q-item v-for="product in products" :key="product?.id">{{
        product?.name
      }}</q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { db } from "../stores/persistentStorage";

const route = useRoute();
const router = useRouter();

const isEditMode = ref(false);
const products = ref([]);

onMounted(async () => {
  // edit mode?
  isEditMode.value = route.params.edit;

  await loadData();
});

async function loadData() {
  try {
    products.value = await db.products.toArray();
  } catch (err) {
    console.error(err);
  }
}

function onFabClick() {
  router.push({ name: "Product Editor" });
}
</script>
      