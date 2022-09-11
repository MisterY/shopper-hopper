<template>
  <q-page>
    Shopping List

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function onFabClick() {
  router.push({ name: "Product List", params: { edit: true } });
}
</script>
  