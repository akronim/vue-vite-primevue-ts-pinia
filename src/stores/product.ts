import { defineStore } from 'pinia'
import type { DemoProduct } from '@/models/demo/demoProduct'
import * as productService from '@/services/demo/demoProductService'

export const useProductsStore = defineStore(`products`, {
  state: () => ({
    products: [] as DemoProduct[],
    productToEdit: {} as DemoProduct | undefined,
    showFormNew: false,
    showFormEdit: false
  }),

  getters: {
    getAllProducts(): DemoProduct[] {
      return this.products
    },

    getProductToEdit(): DemoProduct | undefined {
      return this.productToEdit
    },

    getShowFormNew(): boolean {
      return this.showFormNew
    },

    getShowFormEdit(): boolean {
      return this.showFormEdit
    }
  },

  actions: {
    async fetchAllProducts() {
      this.products = await productService.getAllProducts()
    },

    async fetchProductToEdit(id: string) {
      this.productToEdit = await productService.getProductById(id)
    },

    setShowFormNew(show: boolean) {
      this.showFormNew = show
    },

    setShowFormEdit(show: boolean) {
      this.showFormEdit = show
    }
  }
})
