import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import { routes } from "@/router"
import { beforeEach, expect, test, vi } from 'vitest'
import AppVue from '@/App.vue'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import { createTestingPinia } from '@pinia/testing'

let router: Router

beforeEach(async () => {
  router = createRouter({
    history: createMemoryHistory(),
    routes: routes
  })
})

test(`demo routes - from one to two`, async () => {
  router.push(`/demo/vuetest/one`)
  await router.isReady()

  const wrapper = mount(AppVue, {
    global: {
      plugins: [PrimeVue, ToastService, router, createTestingPinia()]
    }
  })

  const push = vi.spyOn(router, `push`)

  await wrapper.find(`[data-test-unit="goToTwoLink"]`).trigger(`click`)
  expect(push).toHaveBeenCalledTimes(1)
  expect(push).toHaveBeenCalledWith({ name: `vueTestTwo` })
})

test(`demo routes - from two to one`, async () => {
  router.push(`/demo/vuetest/two`)
  await router.isReady()

  const wrapper = mount(AppVue, {
    global: {
      plugins: [PrimeVue, ToastService, router, createTestingPinia()]
    }
  })

  const push = vi.spyOn(router, `push`)

  await wrapper.find(`[data-test-unit="goToOneLink"]`).trigger(`click`)
  expect(push).toHaveBeenCalledTimes(1)
  expect(push).toHaveBeenCalledWith({ name: `vueTestOne` })
})