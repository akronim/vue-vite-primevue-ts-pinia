import { createRouter, createWebHistory, type RouteComponent, type RouteRecordRaw } from 'vue-router'

export const RouteNames = {
  VUE_TEST_ONE: `vueTestOne`,
  VUE_TEST_TWO: `vueTestTwo`,
  VALIDATION_ONE: `validationOne`,
  VALIDATION_TWO: `validationTwo`
}

export const routes: RouteRecordRaw[] = [
  {
    path: `/demo/vuetest/one`,
    name: RouteNames.VUE_TEST_ONE,
    component: (): Promise<RouteComponent> => import(`@/views/demo/VueTestOne.vue`)
  },
  {
    path: `/demo/vuetest/two`,
    name: RouteNames.VUE_TEST_TWO,
    component: (): Promise<RouteComponent> => import(`@/views/demo/VueTestTwo.vue`)
  },
  {
    path: `/demo/validation/one`,
    name: RouteNames.VALIDATION_ONE,
    component: (): Promise<RouteComponent> => import(`@/views/demo/ValidationDemoOne.vue`)
  },
  {
    path: `/demo/validation/two`,
    name: RouteNames.VALIDATION_TWO,
    component: (): Promise<RouteComponent> => import(`@/views/demo/ValidationDemoTwo.vue`)
  }
]

export const router = createRouter({
  routes,
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory()
})