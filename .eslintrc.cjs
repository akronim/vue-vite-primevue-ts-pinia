/* eslint-env node */
require(`@rushstack/eslint-patch/modern-module-resolution`)

module.exports = {
  root: true,
  extends: [
    `plugin:vue/vue3-recommended`,
    `eslint:recommended`,
    `@vue/eslint-config-typescript/recommended`
  ],
  plugins: [
    `unused-imports`
  ],
  parserOptions: {
    ecmaVersion: `latest`
  },
  ignorePatterns: [
    `dist/`, `node_modules`
  ],
  rules: {
    "object-curly-spacing": [`error`, `always`],
    "comma-dangle": [`error`, `never`],
    'max-len': [`error`, { code: 120, comments: 120, ignoreUrls: true, ignorePattern: `d="([\\s\\S]*?)"` }],
    indent: [`error`, 2, { SwitchCase: 1 }],
    'no-console': process.env.NODE_ENV === `production` ? `error` : `warn`,
    'no-debugger': process.env.NODE_ENV === `production` ? `error` : `warn`,
    'vue/block-lang': [`error`, { 'script': { 'lang': `ts` } }],
    "unused-imports/no-unused-imports": `error`,
    '@typescript-eslint/no-explicit-any': `warn`,
    '@typescript-eslint/ban-ts-ignore': `off`,
    '@typescript-eslint/ban-ts-comment': `off`,
    '@typescript-eslint/type-annotation-spacing': `warn`,
    '@typescript-eslint/explicit-function-return-type': [`off`],
    '@typescript-eslint/no-empty-function': [`off`],
    '@typescript-eslint/explicit-module-boundary-types': [`off`],
    "no-nested-ternary": `error`,
    semi: [`error`, `never`],
    quotes: [
      `error`,
      `backtick`,
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'vue/singleline-html-element-content-newline': `error`,
    'vue/html-self-closing': [`error`, {
      'html': {
        'void': `never`,
        'normal': `always`,
        'component': `always`
      },
      'svg': `always`,
      'math': `always`
    }],
    "vue/max-attributes-per-line": [`error`, {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }],
    complexity: [
      `error`,
      {
        "max": 15
      }
    ]
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: [`*.ts`, `*.mts`, `*.cts`, `*.tsx`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': `error`,
        '@typescript-eslint/no-empty-function': [`error`],
        '@typescript-eslint/explicit-module-boundary-types': [`warn`]
      }
    }
  ]
}
