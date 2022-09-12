const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: "", component: () => import("pages/IndexPage.vue") },
      { path: '', name: 'root', redirect: '/shoppinglist' },
      {
        name: 'Shopping Lists',
        path: '/lists',
        component: () => import('src/pages/Lists.vue'),
      },
      {
        name: 'Product Editor',
        path: '/product/:id?',
        component: () => import('src/pages/ProductEditor.vue'),
      },
      {
        name: 'Product List',
        path: '/products/:selection?',
        component: () => import('src/pages/ProductList.vue'),
      },
      {
        path: '/settings',
        component: () => import('src/pages/SettingsPage.vue'),
      },
      {
        name: 'Shopping List',
        path: '/shoppinglist',
        component: () => import('src/pages/ShoppingList.vue'),
      },
      {
        path: '/stores',
        component: () => import('src/pages/StoresList.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
