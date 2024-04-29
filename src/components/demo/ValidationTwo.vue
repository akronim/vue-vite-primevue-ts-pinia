<template>
  <div>
    <div class="p-fluid">
      <label for="name">Name</label>
      <InputText
        id="name"
        v-model="user.userData.name"
      />
      <span class="text-danger">{{ getError('userData.name') }}</span>
    </div>

    <div class="p-fluid">
      <label for="email">Email</label>
      <InputText
        id="email"
        v-model="user.userData.email"
      />
      <span class="text-danger">{{ getError('userData.email') }}</span>
    </div>

    <div class="p-fluid">
      <label for="email">Age</label>
      <InputNumber
        id="age"
        v-model="user.userData.age"
      />
    </div>

    <TabView>
      <TabPanel
        v-for="lang in languages"
        :key="lang"
        :header="lang"
      >
        <div class="p-fluid">
          <label for="description">Description</label>
          <InputText
            id="description"
            v-model="user.userData.localizedData[lang].description"
          />
          <span class="text-danger">{{ getError(`userData.localizedData.${lang}.description`) }}</span>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { userAllSchema } from '@/validation/user'
import InputNumber from 'primevue/inputnumber'
import useValidation from '@/composables/useValidation'

const userStore = useUserStore()
const { getUserToEdit: user } = storeToRefs(userStore)

const userRef = ref(user.value)

const languages = ref([`en`, `it`])

const { /*validate, errors, isValid,*/ getError } = useValidation(userAllSchema, userRef, {
  mode: `eager`
})
</script>

<style>
.text-danger {
  color: red;
}
</style>