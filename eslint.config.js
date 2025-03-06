import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended,
      ...tseslint.configs.recommended
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      "@stylistic": stylistic
    },
    ignores: ['dist'] ,
    rules: {
        '@stylistic/semi': 'error',
        '@stylistic/quotes': ['error', 'single'], // Comillas simples
        '@stylistic/no-trailing-spaces': 'error', // Sin espacios al final de las líneas
        '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }], // 👈 Máximo un salto de línea

        // Indentación con 4 espacios
        '@stylistic/indent': ['error', 4],

        // Espacios alrededor de los corchetes y los arrays
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/array-bracket-spacing': ['error', 'always'],

        //"@typescript-eslint/explicit-function-return-type": "warn", // Las funciones siempre deben tener un tipo de devuelta

      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
