import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    // counter: 0,
    drawerOpen: true,
    selectedProduct: null,
  }),
  //   getters: {
  //     doubleCount: (state) => state.counter * 2,
  //   },
  actions: {
    // increment() {
    //   this.counter++;
    // },
    setDrawerOpen(value) {
      this.drawerOpen = value
    },
    selectProduct(value) {
      this.selectedProduct = value
    },
  },
})
