export default {
    '**/*.{ts,tsx}': [
        'prettier --write',
        'pnpm lint -- --fix',
        'pnpm check-types --',
    ],
    '**/*.{js,css,md,json}': 'prettier --write',
};
