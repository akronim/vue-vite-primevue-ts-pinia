# vue-vite-primevue-ts-pinia

App description goes here.

## Recommended IDE Setup
Volar

## Requirements
- node version 18

## primevue
https://primevue.org/

## primeicons
https://primevue.org/icons/

## primeflex
https://primeflex.org/installation

## vite-svg-loader
- Vite plugin to load SVG files as Vue components, using SVGO for optimization.

## mocking
https://vitest.dev/guide/mocking.html

## pinia testing
https://pinia.vuejs.org/cookbook/testing.html

## validation
https://vee-validate.logaretm.com/v4/
https://zod.dev/


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Unit Tests with coverage

```sh
npm run coverage
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## compliance of primevue components with eslint rules
Add prefix "Pv" to a primevue component to avoid:
1. vue/no-reserved-component-names
2. vue/multi-word-component-names
```ts
import PvButton from 'primevue/button'
```

## forum
https://github.com/orgs/primefaces/discussions



## TODO
- date-fns
- unplugin-vue-components => On-demand components auto importing for Vue
  - https://github.com/unplugin/unplugin-vue-components
- msw
  - https://mswjs.io/

## env issues
https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg