import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [
        'warn',
        {extensions: ['.js', '.mustache']}
        ],
        'import/prefer-default-export': 'off',
        'jsx-quotes': ['error', 'prefer-single']
        }
    }
];