import { defineStore } from 'pinia'
import type { DemoProduct } from '@/models/demo/demoProduct'
import * as productService from '@/services/demo/demoProductService'

export const useProductsStore = defineStore(`products`, {
  state: () => ({
    products: [] as DemoProduct[],
    productToEditId: ``,
    productToEdit: {} as DemoProduct | undefined,
    productToDeleteId: ``,
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

    getProductToEditId(): string {
      return this.productToEditId
    },

    getProductToDeleteId(): string {
      return this.productToDeleteId
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

    setProductToEditId(id: string) {
      this.productToEditId = id
    },

    setProductToDeleteId(id: string) {
      this.productToDeleteId = id
    },

    setShowFormNew(show: boolean) {
      this.showFormNew = show
    },

    setShowFormEdit(show: boolean) {
      this.showFormEdit = show
    }
  }
})
