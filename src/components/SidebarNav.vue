<template>
  <q-drawer v-model="drawerOpen" show-if-above bordered>
    <q-list>
      <!-- <q-item-label header> Navigation Links </q-item-label> -->
      <q-img src="/icons/shopping-cart-icon_256.png" height="13rem" />

      <SidebarLink
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import SidebarLink from "src/components/SidebarLink.vue";
import { useMainStore } from "src/stores/mainStore";

const { drawerOpen } = storeToRefs(useMainStore());

const essentialLinks = [
  // {
  //   title: "Home",
  //   caption: "Main page",
  //   icon: "home",
  //   link: "/",
  // },
  {
    title: "Shopping List",
    caption: "List of items to buy",
    icon: "list_alt",
    link: "/shoppinglist",
  },
  {
    title: "Stores",
    caption: "List of stores",
    icon: "store",
    link: "/stores",
  },
  {
    title: "Products",
    caption: "List of all products",
    icon: "qr_code_2",
    link: "/products",
  },
  {
    title: "Settings",
    caption: "Settings",
    icon: "settings",
    link: "/settings",
  },
];

onMounted(async () => {
  //leftDrawerOpen.value = store.drawerOpen.value
});
</script>