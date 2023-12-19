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

## scss

## happy-dom
- using it instead of jsdom

## axios

## uuid

## inquirer

## figlet


## mocking
https://vitest.dev/guide/mocking.html

## pinia testing
https://pinia.vuejs.org/cookbook/testing.html


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
'Product' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts(1484)


## msw
```text
Mocking with Mock Service Worker (MSW) makes it easy to test HTTP requests by intercepting the requests made by your tests without changing any of the application code.

Install MSW using the command below:

npm install msw --save-dev

We must import the following two dependencies inside our GuessAge.spec.js test file to use MSW:

import { setupServer } from 'msw/node'
import { rest } from 'msw'

Let’s create an instance of the mock server that would intercept the HTTP requests by adding the following code to our GuessAge.spec.js test file:

export const restHandlers = [
   rest.get('https://api.agify.io/', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([
         {
            age: 55,
            name: "tope"
         }
      ]))
   }),
]
const server = setupServer(...restHandlers)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
//  Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
```

## global components
- src/types/global-component.d.ts
```ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}
```

## global components
- src/plugins/global-components.ts
```ts
import type { App } from 'vue'
import MyComponent from 'src/components/MyComponent.vue'

export default function registerGlobalComponents(app: App): void {
  app.component('MyComponent', MyComponent)
}
```
### main.ts
```ts
registerGlobalComponents(app)
```

```ts
    server: {
      proxy: {
        "/api": {
          target: "http://www.jourgeois.com/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      open: true, //Auto Open new window
    },
```

## env issues
https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg