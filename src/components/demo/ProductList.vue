<template>
  <PvButton
    label="New"
    icon="pi pi-plus"
    severity="success"
    class="mr-2"
    @click="openNew"
  />
  <DataTable
    ref="dtProductsRef"
    v-model:selection="selectedProducts"
    v-model:filters="filters"
    :value="products"
    sort-field="code" 
    :sort-order="1"
    size="small"
    striped-rows
    filter-display="row"
    paginator
    :rows="5"
    :rows-per-page-options="[5, 10, 15]"
    paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    current-page-report-template="{first} to {last} of {totalRecords}"
    data-key="id"
    responsive-layout="scroll"
  >
    <template #empty>
      No Data Found.
    </template>
    <template #paginatorstart>
      <PvButton
        type="button"
        icon="pi pi-refresh"
        text
      />
    </template>
    <template #paginatorend>
      <PvButton
        type="button"
        icon="pi pi-download"
        text
      />
    </template>
    <PvColumn
      selection-mode="multiple"
      header-style="width: 3em"
    />
    <PvColumn
      field="code"
      header="Code"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          @input="filterCallback()"
        />
      </template>
    </PvColumn>
    <PvColumn
      field="name"
      header="Name"
      sortable
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          @input="filterCallback()"
        />
      </template>
    </PvColumn>
    <PvColumn
      field="category"
      header="Category"
      sortable
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          @input="filterCallback()"
        />
      </template>
    </PvColumn>
    <PvColumn
      field="quantity"
      header="Quantity"
      sortable
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          @input="filterCallback()"
        />
      </template>
    </PvColumn>
    <PvColumn
      header="Actions"
      header-style="width: 8em"
    >
      <template #body="{ data }">
        <PvButton
          icon="pi pi-pencil"
          class="mr-1"
          @click="editProduct(data)"
        />
        <PvButton
          icon="pi pi-trash"
          class="p-button-danger"
          @click="confirmDeleteProduct(data)"
        />
      </template>
    </PvColumn>
  </DataTable>
  <PvDialog
    v-model:visible="deleteProductDialog"
    :style="{width: '450px'}"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i
        class="pi pi-exclamation-triangle mr-3"
        style="font-size: 2rem"
      />
      <span v-if="productToDelete">{{ messages.YOU_SURE_DELETE }}</span>
    </div>
    <template #footer>
      <PvButton
        label="No"
        icon="pi pi-times"
        text
        @click="deleteProductDialog = false"
      />
      <PvButton
        label="Yes"
        icon="pi pi-check"
        text
        @click="deleteProductItem"
      />
    </template>
  </PvDialog>
  <PvToast />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { RouteNames } from '@/router'
import PvButton from 'primevue/button'
import DataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import InputText from 'primevue/inputtext'
import { type DemoProduct } from '@/models/demo/demoProduct'
import { FilterMatchMode } from 'primevue/api'
import { useProductsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import PvDialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import PvToast from 'primevue/toast'
import { messages } from '@/constants/messages'
import { deleteProduct } from '@/services/demo/demoProductService'

export default defineComponent({
  name: `DemoProducts`,
  components: {
    DataTable,
    PvColumn,
    PvButton,
    InputText,
    PvDialog,
    PvToast
  },
  setup() {
    const productsStore = useProductsStore()
    const { 
      fetchProductToEdit, setShowFormEdit, setShowFormNew, fetchAllProducts 
    } = productsStore
    const { getAllProducts } = storeToRefs(productsStore)
    //const products = computed(() => productsStore.getAllProducts);

    const selectedProducts = ref([])
    const deleteProductDialog = ref(false)
    const dtProductsRef = ref()
    const productToDelete = ref<DemoProduct>({} as DemoProduct)
    const toast = useToast()

    const filters = ref(({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      quantity: { value: null, matchMode: FilterMatchMode.EQUALS }
    }))

    watch(() => [...selectedProducts.value], (newValues: DemoProduct[], oldValues: DemoProduct[]) => {
      // eslint-disable-next-line
      console.log(`New Value:`, newValues?.length)
      // eslint-disable-next-line
      console.log(`Old Value:`, oldValues?.length)
    })

    const editProduct = async (product: DemoProduct): Promise<void> => {
      await fetchProductToEdit(product.id)
      setShowFormEdit(true)
    }

    const confirmDeleteProduct = (product: DemoProduct): void => {
      productToDelete.value = product
      deleteProductDialog.value = true
    }

    const deleteProductItem = async (): Promise<void> => {
      deleteProductDialog.value = false
      await deleteProduct(productToDelete.value.id)
      await fetchAllProducts()
      toast.add({ 
        severity:`success`, summary: messages.SUCCESSFUL, detail: messages.ITEM_DELETED, life: 3000 
      })
    }

    const openNew = (): void => {
      setShowFormNew(true)
    }

    return {
      RouteNames,
      products: getAllProducts,
      selectedProducts,
      filters,
      dtProductsRef,
      editProduct,
      deleteProductDialog,
      confirmDeleteProduct,
      productToDelete,
      deleteProductItem,
      openNew,
      messages
    }
  }
})
</script>
