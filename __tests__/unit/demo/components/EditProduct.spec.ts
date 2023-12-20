import { mount } from '@vue/test-utils'
import EditProduct from '@/components/demo/EditProduct.vue'
import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useProductsStore } from '@/stores/product'
import type { DemoProduct } from '@/models/demo/demoProduct'
import * as productService from '@/services/demo/demoProductService'

const productToEdit: DemoProduct = {
  id: `1`,
  code: `a1b2c3d4`,
  name: `Fitness Tracker`,
  description: `Track your daily activities and monitor fitness goals`,
  price: 29.99,
  category: `Fitness`,
  quantity: 40,
  inventoryStatus: `IN STOCK`
}

describe(`EditProduct.vue`, () => {
  const options = {
    global: {
      plugins: [createTestingPinia()]
    }
  }

  it(`renders form correctly`, async () => {
    const wrapper = mount(EditProduct, options)
    await wrapper.vm.$nextTick()

    expect(wrapper.find(`form`).exists()).toBe(true)
    expect(wrapper.find(`#code`).exists()).toBe(true)
  })

  it(`submits the form`, async () => {
    const wrapper = mount(EditProduct, options)
    await wrapper.vm.$nextTick()
    //await wrapper.vm.saveProduct(); would work too
    await wrapper.find(`[data-test-unit="productEditSaveBtn"]`).trigger(`click`)
    expect(wrapper.vm.submitted).toBe(true)
  })

  it(`cancels and hides the form on button click`, async () => {
    const store = useProductsStore()
    store.productToEdit = productToEdit
  
    const wrapper = mount(EditProduct, options)
    await wrapper.vm.$nextTick()

    await wrapper.find(`[data-test-unit="productEditCancelBtn"]`).trigger(`click`)
  
    expect(store.showFormEdit).toBe(false)
  })

  it(`saves product on button click`, async () => {
    vi.spyOn(productService, `updateProduct`).mockReturnValue(Promise.resolve({} as DemoProduct))

    const store = useProductsStore()
    store.productToEdit = productToEdit

    const wrapper = mount(EditProduct, options)
    await wrapper.vm.$nextTick()

    if (wrapper.vm.product) {
      wrapper.vm.product.category = `foo`
    }

    await wrapper.find(`[data-test-unit="productEditSaveBtn"]`).trigger(`click`)

    expect(productService.updateProduct).toHaveBeenCalled()
    expect(productService.updateProduct).toHaveBeenCalledWith(productToEdit)

    expect(wrapper.vm.submitted).toBe(true)
  })

  it(`does not save product on button click with invalid data`, async () => {
    vi.spyOn(productService, `updateProduct`).mockReturnValue(Promise.resolve({} as DemoProduct))
    const store = useProductsStore()
    store.productToEdit = productToEdit
  
    const wrapper = mount(EditProduct, options)
    await wrapper.vm.$nextTick()
  
    if (wrapper.vm.product) {
      wrapper.vm.product.name = ``
    }

    await wrapper.find(`[data-test-unit="productEditSaveBtn"]`).trigger(`click`)
  
    expect(wrapper.vm.submitted).toBe(true)
    expect(productService.updateProduct).not.toHaveBeenCalled()
  })
})
