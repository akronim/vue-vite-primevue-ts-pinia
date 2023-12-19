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
      <span v-if="productToDelete">Are you sure you want to delete <b>{{ productToDelete.name }}</b>?</span>
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
        @click="deleteProduct(productToDelete)"
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
// 'Product' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts(1484)
import { type DemoProduct } from '@/models/demo/demoProduct'
import { FilterMatchMode } from 'primevue/api'
import { useProductsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import PvDialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import PvToast from 'primevue/toast'

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
    const { fetchProductToEdit, setProductToDeleteId, setShowFormEdit, setShowFormNew } = productsStore
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

    const exportCSV = () => {
      dtProductsRef.value.exportCSV()
    }

    const editProduct = async (product: DemoProduct) => {
      await fetchProductToEdit(product.id)
      setShowFormEdit(true)
    }

    const confirmDeleteProduct = (product: DemoProduct) => {
      productToDelete.value = product
      deleteProductDialog.value = true
    }

    const deleteProduct = (product: DemoProduct) => {
      setProductToDeleteId(product.id)
      deleteProductDialog.value = false
      toast.add({ severity:`success`, summary: `Successful`, detail: `Product Deleted`, life: 3000 })
    }

    const openNew = () => {
      setShowFormNew(true)
    }

    return {
      RouteNames,
      products: getAllProducts,
      selectedProducts,
      filters,
      dtProductsRef,
      exportCSV,
      editProduct,
      deleteProductDialog,
      confirmDeleteProduct,
      productToDelete,
      deleteProduct,
      openNew
    }
  }
})
</script>

<style lang="scss" scoped>
.vue-test-one__head {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
  margin-bottom: 4px;

  a {
    color: $demo-color;
  }
}

.dt-products-toolbar {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>