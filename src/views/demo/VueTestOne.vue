<template>
  <div class="vue-test-one__head">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40">
    <RouterLink :to="{ name: RouteNames.VUE_TEST_TWO }">
      Go To Two
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { RouteNames } from '@/router'

export default defineComponent({
  name: `VueTestOne`,
  components: {
    RouterLink
  },
  setup() {
    return {
      RouteNames
    }
  }
})
</script>

<style scoped>
.vue-test-one__head {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
  margin-bottom: 4px;
}
</style>