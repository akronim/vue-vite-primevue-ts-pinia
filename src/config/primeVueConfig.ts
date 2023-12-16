import type { usePrimeVue } from 'primevue/config'

type PrimeVueConfiguration = ReturnType<typeof usePrimeVue>[`config`]

export const primeVueConfig: PrimeVueConfiguration = {
  ripple: true
  //locale: { },
  // ...
}