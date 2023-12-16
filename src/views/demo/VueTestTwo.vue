<template>
  <div class="vue-test-two__head">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40">
    <RouterLink :to="{ name: RouteNames.VUE_TEST_ONE }">
      Go To One
    </RouterLink>
    <IconHeart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { RouteNames } from '@/router'
import IconHeart from '@/components/icons/IconHeart.vue'

export default defineComponent({
  name: `VueTestOne`,
  components: { RouterLink, IconHeart },
  setup() {
    return {
      RouteNames
    }
  }
})
</script>

<style lang="scss" scoped>
.count {
  margin-top: 20px;
}

button {
  margin-top: 20px;
}

.vue-test-two__head {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
  margin-bottom: 4px;
}
</style>
