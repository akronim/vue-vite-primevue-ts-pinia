<template>
  <div>
    <div class="p-fluid">
      <label for="name">Name</label>
      <InputText
        id="name"
        v-model="name"
      />
      <span class="text-danger">{{ nameError }}</span>
    </div>

    <div class="p-fluid">
      <label for="email">Email</label>
      <InputText
        id="email"
        v-model="email"
      />
      <span class="text-danger">{{ emailError }}</span>
    </div>

    <div class="p-fluid">
      <label for="description">Description</label>
      <InputText
        id="description"
        v-model="description"
      />
      <span class="text-danger">{{ descriptionError }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { z } from 'zod'
import InputText from 'primevue/inputtext'
import { toTypedSchema } from '@vee-validate/zod'

interface User {
  userData: {
    name: string;
    email: string;
    localizedData: {
      [key: string]: { description: string };
    };
  }
}

const props = defineProps({
  lang: { type: String, required: true }
})

const user = ref<User>({
  userData: {
    name: ``,
    email: ``,
    localizedData: {
      en: { description: `` },
      it: { description: `` }
    }
  }
})

const nameFieldSchema = toTypedSchema(
  z.string().min(1, `Name is required`)
)

const emailFieldSchema = toTypedSchema(
  z.string().email({ message: `Please enter a valid email` })
)

const descriptionFieldSchema = toTypedSchema(
  z.string().min(1, `Description is required`)
)

const { value: name, errorMessage: nameError }
  = useField<string>(`name`, nameFieldSchema, { initialValue: user.value.userData.name })
const { value: email, errorMessage: emailError }
  = useField<string>(`email`, emailFieldSchema, { initialValue: user.value.userData.email })
const { value: description, errorMessage: descriptionError }
  = useField<string>(`description`, descriptionFieldSchema, {
    initialValue: user.value.userData.localizedData[props.lang].description
  })

watch([name, email, description], ([newName, newEmail, newDescription]) => {
  user.value.userData.name = newName
  user.value.userData.email = newEmail
  user.value.userData.localizedData[props.lang].description = newDescription

  console.log(user.value)
})
</script>

<style>
.text-danger {
  color: red;
}
</style>