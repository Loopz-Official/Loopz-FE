import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
        },
        rules: {
            'turbo/no-undeclared-env-vars': 'warn',
        },
    },
    {
        plugins: {
            onlyWarn,
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            import: importPlugin,
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    'newlines-between': 'always',
                    pathGroups: [
                        {
                            pattern: '@repo/**',
                            group: 'external',
                            position: 'after',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                },
            ],
        },
    },
    {
        ignores: ['dist/**'],
    },
];
