import { mount } from '@vue/test-utils'
import ProductList from '@/components/demo/ProductList.vue'
import { createTestingPinia } from '@pinia/testing'
import { useProductsStore } from '@/stores/product'
import * as productService from '@/services/demo/demoProductService'
import { describe, expect, it, vi } from 'vitest'
import type { DemoProduct } from '@/models/demo/demoProduct'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'

const products: DemoProduct[] = [
  {
    id: `1`,
    code: `a1b2c3d4`,
    name: `Fitness Tracker`,
    description: `Track your daily activities and monitor fitness goals`,
    price: 29.99,
    category: `Fitness`,
    quantity: 40,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `2`,
    code: `b5c6d7e8`,
    name: `Wireless Earbuds`,
    description: `Compact and wireless earbuds for on-the-go listening`,
    price: 39.99,
    category: `Electronics`,
    quantity: 50,
    inventoryStatus: `OUT OF STOCK`
  }
]

describe(`ProductList.vue`, () => {
  const options = {
    global: {
      plugins: [createTestingPinia(), PrimeVue, ToastService]
    }
  }

  it(`edits a product when edit button is clicked`, async () => {
    const store = useProductsStore()
    store.products = products

    const wrapper = mount(ProductList, options)
    await wrapper.vm.$nextTick()

    await wrapper.vm.editProduct(products[0])

    expect(store.fetchProductToEdit).toHaveBeenCalledWith(products[0].id)
    expect(store.setShowFormEdit).toHaveBeenCalledWith(true)
  })

  it(`deletes a product when confirmed`, async () => {
    vi.spyOn(productService, `deleteProduct`).mockReturnValue(Promise.resolve(true))

    const store = useProductsStore()
    store.products = products

    const wrapper = mount(ProductList, options)
    await wrapper.vm.$nextTick()
    
    await wrapper.vm.confirmDeleteProduct(products[0])
    await wrapper.vm.deleteProductItem()

    expect(productService.deleteProduct).toHaveBeenCalledWith(products[0].id)
    expect(store.fetchAllProducts).toHaveBeenCalled()
  })
})
