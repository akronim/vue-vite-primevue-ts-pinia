<template>
  <div class="vue-test-one__head">
    <VueLogo
      width="40"
      height="40"
    />
    <RouterLink
      :to="{ name: RouteNames.VUE_TEST_TWO }"
      data-test-unit="goToTwoLink"
    >
      Go To Two
    </RouterLink>
    <img
      src="@/assets/primevue-logo.png"
      alt="PrimeVue Logo"
      height="40"
    >
  </div>

  <ProductList v-if="!showFormNew && !showFormEdit" />
  <div class="flex justify-content-start">
    <NewProduct v-if="showFormNew" />
    <EditProduct v-if="showFormEdit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { RouteNames } from '@/router'
import VueLogo from '@/assets/logo.svg?component'
import ProductList from '@/components/demo/ProductList.vue'
import NewProduct from '@/components/demo/NewProduct.vue'
import { useProductsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import EditProduct from '@/components/demo/EditProduct.vue'

export default defineComponent({
  name: `VueTestOne`,
  components: {
    VueLogo,
    ProductList,
    NewProduct,
    EditProduct
  },
  setup() {

    const productsStore = useProductsStore()
    const { fetchAllProducts } = productsStore
    const { getShowFormNew, getShowFormEdit } = storeToRefs(productsStore)

    onMounted(async () => {
      await fetchAllProducts()
    })

    return {
      RouteNames,
      showFormNew: getShowFormNew,
      showFormEdit: getShowFormEdit
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
    color: darkslategrey;
  }
}
</style>