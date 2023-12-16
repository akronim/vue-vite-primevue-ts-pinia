import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VueTestOne from '@/views/demo/VueTestOne.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { RouteNames } from '@/router'
import VueLogo from '@/assets/logo.svg?component'

const mockRouter = createRouter({
    history: createWebHistory(),
    routes: [
        { path: `/`, component: h(`div`) },
        ...routes
    ]
})

describe('VueTestOne', () => {
    const options = {
        global: {
            plugins: [mockRouter]
        }
    }

    it('renders VueLogo and RouterLink', () => {
        const wrapper = mount(VueTestOne, options)

        expect(wrapper.findComponent(VueLogo).exists()).toBe(true)

        expect(wrapper.findComponent(RouterLink).exists()).toBe(true)
        expect(wrapper.findComponent(RouterLink).props().to).toEqual({ name: RouteNames.VUE_TEST_TWO })

        expect(wrapper.classes()).toContain('vue-test-one__head')
        expect(wrapper.findAll('.vue-test-one__head a').length).toBe(1)
    })

    it('snapshot UI testing', () => {
        const wrapper = mount(VueTestOne, options)
        expect(wrapper.text()).toMatchSnapshot()
    })
})