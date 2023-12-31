import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VueTestOne from '@/views/demo/VueTestOne.vue'
import { createRouter, createWebHistory, RouterLink } from 'vue-router'
import { routes, RouteNames } from '@/router'
import { h } from 'vue'
import VueLogo from '@/assets/logo.svg?component'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import { createTestingPinia } from '@pinia/testing'

const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: `/`, component: h(`div`) },
    ...routes
  ]
})

vi.mock(`@/services/demo/demoProductService`, () => ({
  getAllProducts: vi.fn()
}))

describe(`VueTestOne`, () => {
  const options = {
    global: {
      plugins: [PrimeVue, ToastService, mockRouter, createTestingPinia()]
    }
  }

  it(`renders VueLogo and RouterLink`, () => {
    const wrapper = mount(VueTestOne, options)

    expect(wrapper.findComponent(VueLogo).exists()).toBe(true)

    expect(wrapper.findComponent(RouterLink).exists()).toBe(true)
    expect(wrapper.findComponent(RouterLink).props().to).toEqual({ name: RouteNames.VUE_TEST_TWO })

    const headEl = wrapper.find(`.vue-test-one__head`)
    expect(headEl.exists()).toBe(true)

    expect(wrapper.findAll(`.vue-test-one__head a`).length).toBe(1)
  })
})