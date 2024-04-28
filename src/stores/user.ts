import { defineStore } from 'pinia'
import type { User } from '@/models/demo/user'

export const useUserStore = defineStore(`user`, {
  state: () => ({
    user: {
      userData: {
        name: `name`,
        email: `email@email.com`,
        age: 20,
        localizedData: {
          en: { description: `desc-en` },
          it: { description: `desc-it` }
        }
      }
    } as User
  }),

  getters: {
    getUserToEdit(): User {
      return this.user
    }
  },

  actions: {

  }
})
