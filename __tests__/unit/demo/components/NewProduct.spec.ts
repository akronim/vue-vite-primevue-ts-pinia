import { flushPromises, mount } from '@vue/test-utils'
import NewProduct from '@/components/demo/NewProduct.vue'
import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import * as productService from '@/services/demo/demoProductService'
import type { DemoProduct } from '@/models/demo/demoProduct'

describe(`NewProduct.vue`, () => {
  const options = {
    global: {
      plugins: [createTestingPinia()]
    }
  }

  it(`renders form correctly`, async () => {
    const wrapper = mount(NewProduct, options)
    expect(wrapper.find(`form`).exists()).toBe(true)
  })

  it(`saves product - valid data`, async () => {
    vi.spyOn(productService, `createProduct`).mockReturnValue(Promise.resolve({} as DemoProduct))
    const wrapper = mount(NewProduct, options)

    const productToCreate = {
      price: 29.99,
      category: `Fitness`,
      quantity: 40,
      inventoryStatus: `IN STOCK`
    }

    wrapper.vm.product = productToCreate as DemoProduct

    wrapper.vm.code = `a1b2c3d4`
    wrapper.vm.name = `Fitness Tracker`
    wrapper.vm.description = `Track your daily activities and monitor fitness goals`

    await wrapper.vm.saveProduct()
    await flushPromises()

    expect(productService.createProduct).toHaveBeenCalled()

    const expected = {
      ...productToCreate,
      code: `a1b2c3d4`,
      name: `Fitness Tracker`,
      description: `Track your daily activities and monitor fitness goals`
    }

    expect(productService.createProduct).toHaveBeenCalledWith(expected)
    expect(wrapper.vm.errors).toEqual({})
  })

  it(`does not save product - invalid data`, async () => {
    vi.spyOn(productService, `createProduct`).mockReturnValue(Promise.resolve({} as DemoProduct))
    const wrapper = mount(NewProduct, options)
    const saveProductSpy = vi.spyOn(wrapper.vm, `saveProduct`)
    await flushPromises()

    const productToCreate = {
      price: 29.99,
      category: `Fitness`,
      quantity: 40,
      inventoryStatus: `IN STOCK`
    }

    wrapper.vm.product = productToCreate as DemoProduct

    await wrapper.vm.saveProduct()
    await flushPromises()

    expect(saveProductSpy).toHaveBeenCalled()
    expect(productService.createProduct).not.toHaveBeenCalled()
    expect(wrapper.vm.errors).toEqual({ 
      code: `Code is required`, name: `Name is required`, description: `Description is required` 
    })
  })
})
