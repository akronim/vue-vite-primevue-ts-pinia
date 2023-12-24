<template>
  <form v-if="product">
    <div
      class="p-fluid"
      :style="{ width: '450px' }"
    >
      <div class="field">
        <label for="code">Code</label>
        <InputText
          id="code"
          v-model="product.code"
        />
      </div>
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="product.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !product.name }"
        />
        <small
          v-if="submitted && !product.name"
          class="p-error"
        >
          Name is required.
        </small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <PvTextarea
          id="description"
          v-model="product.description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>
      <div class="field">
        <label
          for="inventoryStatus"
          class="mb-3"
        >Inventory Status</label>
        <Dropdown
          id="inventoryStatus"
          v-model="product.inventoryStatus"
          :options="statuses"
          option-label="label"
          option-value="value"
          placeholder="Select a Status"
        />
      </div>
      <div class="field">
        <label class="mb-3">Category</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category1"
              v-model="product.category"
              name="category"
              value="Accessories"
            />
            <label for="category1">Accessories</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category2"
              v-model="product.category"
              name="category"
              value="Clothing"
            />
            <label for="category2">Clothing</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category3"
              v-model="product.category"
              name="category"
              value="Electronics"
            />
            <label for="category3">Electronics</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category4"
              v-model="product.category"
              name="category"
              value="Fitness"
            />
            <label for="category4">Fitness</label>
          </div>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Price</label>
          <InputNumber
            id="price"
            v-model="product.price"
            mode="currency"
            currency="EUR"
          />
        </div>
        <div class="field col">
          <label for="quantity">Quantity</label>
          <InputNumber
            id="quantity"
            v-model="product.quantity"
            integeronly
          />
        </div>
      </div>
    </div>
    <div class="flex justify-content-end">
      <PvButton
        label="Cancel"
        icon="pi pi-times"
        text
        data-test-unit="productEditCancelBtn"
        @click="hideForm"
      />
      <PvButton
        label="Save"
        icon="pi pi-check"
        text
        data-test-unit="productEditSaveBtn"
        @click="saveProduct"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import PvButton from 'primevue/button'
import { useProductsStore } from '@/stores'
import type { DemoProduct } from '@/models/demo/demoProduct'
import PvTextarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import { updateProduct } from '@/services/demo/demoProductService'

export default defineComponent({
  name: `EditProduct`,
  components: {
    InputText,
    InputNumber,
    PvButton,
    PvTextarea,
    Dropdown,
    RadioButton
  },
  setup() {
    const productsStore = useProductsStore()
    const { getProductToEdit } = productsStore
    const product = ref<DemoProduct>()
    const { setShowFormEdit, fetchAllProducts } = productsStore
    const submitted = ref(false)
    const statuses = ref([
      { label: `IN STOCK`, value: `IN STOCK` },
      { label: `LOW STOCK`, value: `LOW STOCK` },
      { label: `OUT OF STOCK`, value: `OUT OF STOCK` }
    ]) 

    const saveProduct = async () => {
      submitted.value = true

      if (product.value?.name?.trim()) {
        await updateProduct(product.value)
        await fetchAllProducts()
        hideForm()
      }
    }

    const hideForm = () => {
      product.value = {} as DemoProduct
      setShowFormEdit(false)
    }

    onMounted(() => {
      if (getProductToEdit) {
        product.value = getProductToEdit
      }
    })

    return {
      product,
      saveProduct,
      submitted,
      hideForm,
      statuses
    }
  }
})
</script>
