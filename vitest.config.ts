import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: [
        `__tests__/setup.ts`
      ],
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul',
        all: true,
        include: [
          `src/**/components/**/*.vue`,
          `src/**/views/**/*.vue`,
          `src/**/services/**/*.ts`,
          `src/**/utils/**/*.ts`,
          `src/**/composables/**/*.ts`,
          `src/**/stores/**/*.ts`,
          `src/**/router/**/*.ts`,
          // add the rest as it is created
        ],
        reportsDirectory: `coverage`,
        reporter: [`text`]
      },
    }
  })
)
