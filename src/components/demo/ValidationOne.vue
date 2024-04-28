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
      <label for="email">Age</label>
      <InputNumber
        id="age"
        v-model="user.userData.age"
      />
    </div>

    <TabView @tab-change="onTabChange">
      <TabPanel
        v-for="lang in languages"
        :key="lang"
        :header="lang"
      >
        <div class="p-fluid">
          <label for="description">Description</label>
          <InputText
            id="description"
            v-model="description"
          />
          <span class="text-danger">{{ descriptionError }}</span>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useField, useForm, useSetFormValues } from 'vee-validate'
import InputText from 'primevue/inputtext'
import TabView, { type TabViewChangeEvent } from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { userSchema } from '@/validation/user'
import { toTypedSchema } from '@vee-validate/zod'
import InputNumber from 'primevue/inputnumber'

const userStore = useUserStore()
const { getUserToEdit: user } = storeToRefs(userStore)

const languages = ref([`en`, `it`])
const selectedLanguageIndex = ref(0)
const language = ref(languages.value[selectedLanguageIndex.value])

const validationSchema = toTypedSchema(userSchema)

useForm({
  validationSchema,
  validateOnMount: true
})

const { value: name, errorMessage: nameError } = useField<string>(`name`)
const { value: email, errorMessage: emailError } = useField<string>(`email`)
const { value: description, errorMessage: descriptionError } = useField<string>(`description`)

watch([name, email, description], ([newName, newEmail, newDescription]) => {
  user.value.userData.name = newName
  user.value.userData.email = newEmail
  user.value.userData.localizedData[language.value].description = newDescription

  console.log(user.value)
})

const onTabChange = (e: TabViewChangeEvent): void => {
  selectedLanguageIndex.value = e.index
  language.value = languages.value[selectedLanguageIndex.value]
  description.value =
    user.value.userData.localizedData[language.value].description
}

const setFormValues = useSetFormValues()

onMounted(() => {
  setFormValues({
    name: user.value.userData.name,
    email: user.value.userData.email,
    description: user.value.userData.localizedData[language.value].description
  })
})
</script>

<style>
.text-danger {
  color: red;
}
</style>