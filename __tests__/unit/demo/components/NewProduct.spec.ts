import { mount } from '@vue/test-utils'
import NewProduct from '@/components/demo/NewProduct.vue'
import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import type { DemoProduct } from '@/models/demo/demoProduct'
import * as productService from '@/services/demo/demoProductService'

const productToCreate: DemoProduct = {
  id: `1`,
  code: `a1b2c3d4`,
  name: `Fitness Tracker`,
  description: `Track your daily activities and monitor fitness goals`,
  price: 29.99,
  category: `Fitness`,
  quantity: 40,
  inventoryStatus: `IN STOCK`
}

describe(`NewProduct.vue`, () => {
  const options = {
    global: {
      plugins: [createTestingPinia()]
    }
  }

  it(`renders form correctly`, async () => {
    const wrapper = mount(NewProduct, options)
    expect(wrapper.find(`form`).exists()).toBe(true)
    expect(wrapper.find(`#code`).exists()).toBe(true)
  })

  it(`submits the form`, async () => {
    const wrapper = mount(NewProduct, options)
    //await wrapper.vm.saveProduct(); would work too
    await wrapper.find(`[data-test-unit="productNewSaveBtn"]`).trigger(`click`)
    expect(wrapper.vm.submitted).toBe(true)
  })

  it(`saves product on button click`, async () => {
    vi.spyOn(productService, `createProduct`).mockReturnValue(Promise.resolve({} as DemoProduct))

    const wrapper = mount(NewProduct, options)

    wrapper.vm.product = productToCreate

    await wrapper.find(`[data-test-unit="productNewSaveBtn"]`).trigger(`click`)

    expect(productService.createProduct).toHaveBeenCalled()

    expect(wrapper.vm.submitted).toBe(true)
  })
})
