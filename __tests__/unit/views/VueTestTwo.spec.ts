import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import VueTestTwo from '@/views/demo/VueTestTwo.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'
import { h } from 'vue'

const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: `/`, component: h(`div`) },
    ...routes
  ]
})

describe(`VueTestTwo`, () => {
  const options = {
    global: {
      plugins: [mockRouter]
    }
  }

  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    wrapper = mount(VueTestTwo, options)
  })

  it(`renders properly`, async () => {
    expect(wrapper.isVisible()).toBeTruthy()
  })

  it('snapshot UI testing', () => {
    expect(wrapper.text()).toMatchSnapshot()
  })
})

