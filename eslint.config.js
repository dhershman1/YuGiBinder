import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

import globals from 'globals'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*']
  },
  skipFormatting,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': 'error'
    }
  }
]
