import { nextJsConfig } from '@repo/eslint-config/next-js';
import prettierConfig from 'eslint-config-prettier';

const config = [
    {
        ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'],
    },
    ...(Array.isArray(nextJsConfig) ? nextJsConfig : [nextJsConfig]),
    {
        rules: {
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    prettierConfig,
];

export default config;
