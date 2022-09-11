<template>
  <q-page>
    Products

    <div>
        Edit mode: {{isEditMode}}
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="onFabClick" />
    </q-page-sticky>
</q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router'
import { useRouter } from "vue-router";

const route = useRoute()
const router = useRouter();

const isEditMode = ref(false)

onMounted(() => {
    // edit mode?
    isEditMode.value = route.params.edit
    
})

function onFabClick() {
  router.push({ name: "Product Editor" });
}

</script>
      