<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Shopper Hopper </q-toolbar-title>

        <div>v</div>
      </q-toolbar>
    </q-header>

    <SidebarNav></SidebarNav>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from 'src/stores/mainStore'
import SidebarNav from 'src/components/SidebarNav.vue'
//import { storeToRefs } from 'pinia';

const store = useMainStore()

function toggleLeftDrawer() {
  const isOpen = store.drawerOpen
  // console.log('toggling', isOpen)
  store.setDrawerOpen(!isOpen)
}
</script>
