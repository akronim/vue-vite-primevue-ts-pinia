import { defineStore } from 'pinia'
import type { DemoProduct } from '@/models/demo/demoProduct'
import * as productService from '@/services/demo/demoProductService'

export const useProductsStore = defineStore(`products`, {
  state: () => ({
    products: [] as DemoProduct[],
    productToEditId: -1,
    productToEdit: {} as DemoProduct | undefined,
    productToDeleteId: -1
  }),

  getters: {
    getAllProducts(): DemoProduct[] {
      return this.products
    },

    getProductToEdit(): DemoProduct | undefined {
      return this.productToEdit
    },

    getProductToEditId(): number {
      return this.productToEditId
    },

    getProductToDeleteId(): number {
      return this.productToDeleteId
    }
  },

  actions: {
    async fetchAllProducts() {
      this.products = await productService.getAllProducts()
    },

    async fetchProductToEdit(id: number) {
      this.productToEdit = await productService.getProductById(id)
    },

    setProductToEditId(id: number) {
      this.productToEditId = id
    },

    setProductToDeleteId(id: number) {
      this.productToDeleteId = id
    }
  }
})
