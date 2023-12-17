<template>
  <div class="vue-test-one__head">
    <VueLogo width="40" height="40" />
    <RouterLink :to="{ name: RouteNames.VUE_TEST_TWO }">
      Go To Two
    </RouterLink>
    <img src="@/assets/primevue-logo.png" alt="PrimeVue Logo" height="40">
  </div>
  <div class="dt-products-toolbar">
    <PvButton icon="pi pi-external-link" label="Export" @click="exportCSV" />
  </div>
  <DataTable ref="dtProductsRef" :value="products" size="small" v-model:selection="selectedProducts"
    v-model:filters="filters" stripedRows filterDisplay="row" paginator :rows="5" :rows-per-page-options="[5, 10, 15]"
    paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    current-page-report-template="{first} to {last} of {totalRecords}" data-key="id" responsive-layout="scroll">
    <template #empty>
      No Data Found.
    </template>
    <template #paginatorstart>
      <PvButton type="button" icon="pi pi-refresh" text />
    </template>
    <template #paginatorend>
      <PvButton type="button" icon="pi pi-download" text />
    </template>
    <PvColumn selection-mode="multiple" header-style="width: 3em" />
    <PvColumn field="code" header="Code">
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
      </template>
    </PvColumn>
    <PvColumn field="name" header="Name" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
      </template>
    </PvColumn>
    <PvColumn field="category" header="Category" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
      </template>
    </PvColumn>
    <PvColumn field="quantity" header="Quantity" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="p-column-filter" />
      </template>
    </PvColumn>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { RouteNames } from '@/router'
import VueLogo from '@/assets/logo.svg?component'
import PvButton from 'primevue/button'
import DataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import InputText from 'primevue/inputtext'
// 'Product' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts(1484)
import { type DemoProduct, mockProducts } from '@/models/demo/demoProduct'
import { FilterMatchMode } from 'primevue/api'
import * as ProductService from '@/services/demo/demoProductService'

export default defineComponent({
  name: `VueTestOne`,
  components: {
    VueLogo,
    DataTable,
    PvColumn,
    PvButton,
    InputText
  },
  setup() {
    const products = ref<DemoProduct[]>([])
    const selectedProducts = ref([])
    const dtProductsRef = ref()

    const filters = ref(({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
    }))

    watch(() => [...selectedProducts.value], (newValues: DemoProduct[], oldValues: DemoProduct[]) => {
      console.log('New Value:', newValues?.length);
      console.log('Old Value:', oldValues?.length);
    });

    const exportCSV = () => {
      dtProductsRef.value.exportCSV();
    };

    onMounted(async () => {
      products.value = await ProductService.getAllProducts()

      if (!products?.value?.length) {
        products.value = mockProducts
      }
    })

    return {
      RouteNames,
      products,
      selectedProducts,
      filters,
      dtProductsRef,
      exportCSV
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