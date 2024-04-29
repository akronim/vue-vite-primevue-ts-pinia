<template>
  <ValidationTwo class="mb-4" />
  <Button
    label="Submit"
    @click="onSubmitBtnClick"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { toTypedSchema } from '@vee-validate/zod'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { userAllSchema } from '@/validation/user'
import ValidationTwo from '@/components/demo/ValidationTwo.vue'

const userStore = useUserStore()
const { getUserToEdit: user } = storeToRefs(userStore)

const userAllValidationSchema = toTypedSchema(userAllSchema)

const onSubmitBtnClick = async (): Promise<void> => {
  console.log(`user`, user.value)

  const userAllValidationResult = userAllSchema.safeParse(user.value)
  if (userAllValidationResult.success) {
    console.log(`Object is valid:`, userAllValidationResult.data)
  } else {
    console.error(`Validation errors:`, userAllValidationResult.error.errors)
  }

  console.log(`validationSchema`, await userAllValidationSchema.parse(user.value))
}
</script>