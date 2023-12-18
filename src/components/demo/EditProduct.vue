<template>
  <div v-if="product">
    <div>
      <label for="code">Product Code:</label>
      <InputText
        id="code"
        v-model="product.code"
      />
    </div>
    <div>
      <label for="name">Product Name:</label>
      <InputText
        id="name"
        v-model="product.name"
      />
    </div>
    <div>
      <label for="category">Category:</label>
      <InputText
        id="category"
        v-model="product.category"
      />
    </div>
    <div>
      <label for="quantity">Quantity:</label>
      <InputNumber
        id="quantity"
        v-model="product.quantity"
      />
    </div>
    <div>
      <PvButton @click="saveProduct">
        Save
      </PvButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import PvButton from 'primevue/button'
import { useProductsStore } from '@/stores'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: `EditProduct`,
  components: {
    InputText,
    InputNumber,
    PvButton
  },
  setup() {
    const productsStore = useProductsStore()
    const { getProductToEdit: product } = storeToRefs(productsStore)

    const saveProduct = () => {
      // eslint-disable-next-line
      console.log(`Saving product:`, product.value)
    }

    return {
      product,
      saveProduct
    }
  }
})
</script>
