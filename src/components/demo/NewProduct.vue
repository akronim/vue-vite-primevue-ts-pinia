<template>
  <form>
    <div
      class="p-fluid"
      :style="{ width: '450px' }"
    >
      <div class="field">
        <label for="code">Code</label>
        <InputText
          id="code"
          v-model="code"
          :class="{ 'p-invalid': errors.code }"
        />
        <small
          class="p-error"
        >
          {{ errors.code }}
        </small>
      </div>
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="name"
          required="true"
          autofocus
          :class="{ 'p-invalid': errors.name }"
        />
        <small
          class="p-error"
        >
          {{ errors.name }}
        </small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <PvTextarea
          id="description"
          v-model="description"
          required="true"
          rows="3"
          cols="20"
          :class="{ 'p-invalid': errors.description }"
        />
        <small
          class="p-error"
        >
          {{ errors.description }}
        </small>
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
        @click="hideForm"
      />
      <PvButton
        label="Save"
        data-test-unit="productNewSaveBtn"
        icon="pi pi-check"
        text
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
import { createProduct } from '@/services/demo/demoProductService'
import { useField, useForm } from "vee-validate"
import { z } from 'zod'
import { toTypedSchema } from "@vee-validate/zod"

export default defineComponent({
  name: `NewProduct`,
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
    const { setShowFormNew, fetchAllProducts } = productsStore
    const product = ref<DemoProduct>({} as DemoProduct)
    const statuses = ref([
      { label: `IN STOCK`, value: `IN STOCK` },
      { label: `LOW STOCK`, value: `LOW STOCK` },
      { label: `OUT OF STOCK`, value: `OUT OF STOCK` }
    ]) 

    const validationSchema = toTypedSchema(z.object({
      code: z.string().min(8, { message: `Code is required` }).max(15),
      name: z.string().min(1, { message: `Name is required` }).max(20)
        .refine((i) => !i.includes(`foo`), { message: `Name can not include 'foo'` }),
      description: z.string().min(1, { message: `Description is required` }).max(60)
    }))

    const { errors, validate, resetForm } = useForm({ validationSchema })

    const { value: code } = useField<string>(`code`)
    const { value: name } = useField<string>(`name`)
    const { value: description } = useField<string>(`description`)

    const saveProduct = async (): Promise<void> => {
      const isFormValid = (await validate()).valid

      if (isFormValid) {
        product.value.code = code.value 
        product.value.name = name.value 
        product.value.description = description.value 

        await createProduct(product.value)
        await fetchAllProducts()

        resetForm()
        hideForm()
      }
    }

    const hideForm = (): void => {
      product.value = {} as DemoProduct
      setShowFormNew(false)
    }

    onMounted(() => {
      code.value = `` 
      name.value = ``
      description.value = ``
    })

    return {
      product,
      saveProduct,
      hideForm,
      statuses,
      code,
      name,
      description,
      errors
    }
  }
})
</script>
