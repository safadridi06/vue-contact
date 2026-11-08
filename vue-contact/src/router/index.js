
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: () => import('../views/ListeContacts.vue')
    },
    {
      path: '/contacts/ajouter',
      component: () => import('../views/AjouterContact.vue')
    },
    {
      path: '/contacts/:id',
      component: () => import('../views/DetailContact.vue')
    }
  ]
})

export default router
