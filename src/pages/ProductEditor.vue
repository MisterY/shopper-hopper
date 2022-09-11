<template>
  <q-page class="q-ma-sm">
    Product Editor

    <q-input label="Product Name" />
    <q-input label="Description" />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="check" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
// todo: do we have an id?
</script>