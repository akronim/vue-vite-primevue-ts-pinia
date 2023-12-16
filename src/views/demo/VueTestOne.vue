<template>
  <div class="vue-test-one__head">
    <VueLogo width="40" height="40" />
    <RouterLink :to="{ name: RouteNames.VUE_TEST_TWO }">
      Go To Two
    </RouterLink>
    <img
      src="@/assets/primevue-logo.png"
      alt="PrimeVue Logo"
      height="40"
    >
  </div>
  <div class="dt-products-toolbar">
    <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
    <PvButton icon="pi pi-external-link" label="Export" @click="exportCSV" />
  </div>
  <DataTable ref="dtProductsRef" :value="products" :size="size.value" v-model:selection="selectedProducts"
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
    <Column selection-mode="multiple" header-style="width: 3em" />
    <Column field="code" header="Code">
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
      </template>
    </Column>
    <Column field="name" header="Name" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
      </template>
    </Column>
    <Column field="category" header="Category" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
      </template>
    </Column>
    <Column field="quantity" header="Quantity" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="p-column-filter" />
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { RouteNames } from '@/router'
import VueLogo from '@/assets/logo.svg?component'
import PvButton from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
// 'Product' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts(1484)
import { type Product, mockProducts } from '@/models/demoProduct'
import { FilterMatchMode } from 'primevue/api'

export default defineComponent({
  name: `VueTestOne`,
  components: {
    RouterLink,
    VueLogo,
    DataTable,
    Column,
    PvButton,
    InputText,
    SelectButton
  },
  setup() {
    const products = ref<Product[]>(mockProducts)
    const selectedProducts = ref([])
    const dtProductsRef = ref()

    const filters = ref(({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
    }))

    watch(() => [...selectedProducts.value], (newValues: Product[], oldValues: Product[]) => {
      console.log('New Value:', newValues?.length);
      console.log('Old Value:', oldValues?.length);
    });

    const exportCSV = () => {
      dtProductsRef.value.exportCSV();
    };

    const size = ref({ label: 'Normal', value: undefined });
    const sizeOptions = ref([
      { label: 'Small', value: 'small' },
      { label: 'Normal', value: undefined },
      { label: 'Large', value: 'large' }
    ]);

    return {
      RouteNames,
      products,
      selectedProducts,
      filters,
      dtProductsRef,
      exportCSV, 
      size, 
      sizeOptions
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
  justify-content: space-between;
  align-items: center;
}
</style>