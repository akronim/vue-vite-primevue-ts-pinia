<template>
  <div class="vue-test-two__head">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="40"
      height="40"
    >
    <RouterLink
      :to="{ name: RouteNames.VUE_TEST_ONE }"
      data-test-unit="goToOneLink"
    >
      Go To One
    </RouterLink>
    <IconHeart />
  </div>
  <PvToast />
  <PvButton
    label="Count"
    @click="increaseCount"
  />
  <h5 class="count">
    {{ count }}
  </h5>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouteNames } from '@/router'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useToast } from 'primevue/usetoast'
import PvButton from 'primevue/button'
import PvToast from 'primevue/toast'

export default defineComponent({
  name: `VueTestTwo`,
  components: { IconHeart, PvToast, PvButton },
  setup() {
    const toast = useToast()
    const count = ref(0)

    const increaseCount = () => {
      count.value++

      if (count.value === 3) {
        toast.add({
          severity: `success`,
          summary: `PrimeVue`,
          detail: `Welcome to PrimeVue`,
          life: 3000
        })

        count.value = 0
      }
    }

    return {
      count,
      increaseCount,
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

  a {
    color: darkslategrey;
  }
}
</style>
