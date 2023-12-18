<template>
  <div class="vue-test-one__head">
    <VueLogo
      width="40"
      height="40"
    />
    <RouterLink :to="{ name: RouteNames.VUE_TEST_TWO }">
      Go To Two
    </RouterLink>
    <img
      src="@/assets/primevue-logo.png"
      alt="PrimeVue Logo"
      height="40"
    >
  </div>
  <PvButton
    label="New"
    icon="pi pi-plus"
    severity="success"
    class="mr-2"
    @click="openNew"
  />
  <ProductList />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { RouteNames } from '@/router'
import VueLogo from '@/assets/logo.svg?component'
import PvButton from 'primevue/button'
import ProductList from '@/components/demo/ProductList.vue'
import { useProductsStore } from '@/stores'

export default defineComponent({
  name: `VueTestOne`,
  components: {
    VueLogo,
    ProductList,
    PvButton
  },
  setup() {

    const productsStore = useProductsStore()
    const { fetchAllProducts } = productsStore

    const openNew = () => {
      // eslint-disable-next-line
      console.log("TODO")
    }

    onMounted(async () => {
      await fetchAllProducts()
    })

    return {
      RouteNames,
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