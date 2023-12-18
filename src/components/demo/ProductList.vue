<template>
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
          @click="editProduct(data)"
        />
        <PvButton
          icon="pi pi-trash"
          class="p-button-danger"
          @click="deleteProduct(data)"
        />
      </template>
    </PvColumn>
  </DataTable>
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

export default defineComponent({
  name: `DemoProducts`,
  components: {
    DataTable,
    PvColumn,
    PvButton,
    InputText
  },
  setup() {
    const productsStore = useProductsStore()
    const { fetchProductToEdit, setProductToDeleteId } = productsStore
    const { getAllProducts } = storeToRefs(productsStore)
    //const products = computed(() => productsStore.getAllProducts);

    const selectedProducts = ref([])
    const dtProductsRef = ref()

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
    }

    const deleteProduct = (product: DemoProduct) => {
      setProductToDeleteId(product.id)
    }

    return {
      RouteNames,
      products: getAllProducts,
      selectedProducts,
      filters,
      dtProductsRef,
      exportCSV,
      editProduct,
      deleteProduct
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