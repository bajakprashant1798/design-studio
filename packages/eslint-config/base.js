import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '**/.next/**',
    '**/.medusa/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
  ]),
])
