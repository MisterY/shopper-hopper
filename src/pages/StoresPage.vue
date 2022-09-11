<template>
  <q-page>
    <div>Stores</div>

    <q-list>
      <q-item v-for="store in stores" :key="store.id">{{ store.name }}</q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>

  <q-dialog v-model="isPromptVisible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New Store</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="storeName"
          autofocus
          @keyup.enter="isPromptVisible = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add store" v-close-popup @click="onAddStore" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db } from "../stores/persistentStorage";
import {Store} from '../stores/model'

const stores = ref([]);
const isPromptVisible = ref(false);
const storeName = ref(null)

onMounted(async () => {
  // load stores
  //   stores.value =
  await loadData();
});

async function loadData() {
  stores.value = await db.stores.toArray() //.toCollection()

  //const count = await stores.count()
//   console.debug(stores.value);
}

async function onAddStore() {
    const newStore = new Store()
    newStore.name = storeName.value

    console.debug('saving', newStore)

    await db.stores.add(newStore)

    await loadData()
}

function onFabClick() {
  // new store
  isPromptVisible.value = true;
}
</script>