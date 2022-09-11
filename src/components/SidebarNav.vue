<template>
        <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

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
import { storeToRefs } from 'pinia';
import SidebarLink from 'src/components/SidebarLink.vue'
import { useMainStore } from 'src/stores/mainStore';

const {drawerOpen} = storeToRefs(useMainStore())

// const leftDrawerOpen = ref(false);

const essentialLinks = [
  {
    title: 'Home',
    caption: 'Main page',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Settings',
    caption: 'Settings',
    icon: 'settings',
    link: 'settings'
  }
]

onMounted(async () => {
  //leftDrawerOpen.value = store.drawerOpen.value
})
</script>