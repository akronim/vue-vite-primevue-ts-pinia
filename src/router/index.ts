import { createRouter, createWebHistory } from 'vue-router'
import VueTestTwo from '@/views/demo/VueTestTwo.vue'

export const RouteNames = {
  VUE_TEST_ONE: `vueTestOne`,
  VUE_TEST_TWO: `vueTestTwo`
}

export const routes = [
  {
    path: `/admin/vuetest/one`,
    name: RouteNames.VUE_TEST_ONE,
    component: (): any => import(`@/views/demo/VueTestOne.vue`)
  },
  {
    path: `/admin/vuetest/two`,
    name: RouteNames.VUE_TEST_TWO,
    component: VueTestTwo
    //component: () => import(`@/views/demo/VueTestTwo.vue`)
  }
]

export const router = createRouter({
  routes,
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory()
})