import { defineStore } from 'pinia';
import type { DemoProduct } from '@/models/demo/demoProduct';
import * as productService from '@/services/demo/demoProductService'

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [] as DemoProduct[],
        productToEditId: -1,
        productToEdit: {} as DemoProduct,
        productToDeleteId: -1
    }),

    actions: {
        async getAllProducts() {
            this.products = await productService.getAllProducts();
        },

        async getProductToEdit(id: number) {
            this.productToEdit = await productService.getProductById(id)
        },

        async setProductToEditId(id: number) {
            this.productToEditId = id
        },

        async setProductToDeleteId(id: number) {
            this.productToDeleteId = id
        }
    },
});
