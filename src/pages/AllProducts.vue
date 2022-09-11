<template>
  <q-page>
    All Product

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from "vue";


function onFabClick() {
}
</script>
      