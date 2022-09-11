<template>
  <div class="q-pa-sm">
    <!-- <q-header>Settings</q-header> -->
    Settings blah blah

    <div>
      <h1>Theme</h1>
      <q-checkbox v-model="isDarkModeOn" @update:model-value="toggleDarkMode">Dark Mode</q-checkbox>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const isDarkModeOn = ref(null);

onMounted(async () => {
  isDarkModeOn.value = $q.dark.isActive;
  //console.debug($q.dark.mode)
  //$q.dark.set(true)
  // $q.dark.toggle()
});

function toggleDarkMode() {
    console.debug('toggling...')
    $q.dark.toggle()
}
</script>