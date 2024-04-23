<template>
  <div>
    <div class="p-fluid">
      <label for="name">Name</label>
      <InputText
        id="name"
        v-model="name"
      />
      <span class="text-danger">{{ errors.name }}</span>
    </div>

    <div class="p-fluid">
      <label for="email">Email</label>
      <InputText
        id="email"
        v-model="email"
      />
      <span class="text-danger">{{ errors.email }}</span>
    </div>

    <div class="p-fluid">
      <label for="description">Description</label>
      <InputText
        id="description"
        v-model="description"
      />
      <span class="text-danger">{{ errors.description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
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

const validationSchema = toTypedSchema(z.object({
  name: z.string().min(1, `Name is required`),
  email: z.string().email({ message: `Please enter a valid email` }),
  description: z.string().min(1, `Description is required`)
}))

const { errors } = useForm({
  validationSchema,
  initialValues: {
    name: user.value.userData.name,
    email: user.value.userData.email,
    description: user.value.userData.localizedData[props.lang].description
  }
})

const { value: name } = useField<string>(`name`)
const { value: email } = useField<string>(`email`)
const { value: description } = useField<string>(`description`)

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
