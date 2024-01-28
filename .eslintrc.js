/* eslint-disable prettier/prettier */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:react/jsx-runtime',
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'import/prefer-default-export': 'off',
        'react/display-name': 'off',
        'no-underscore-dangle': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        'one-var': 'off',
        'no-unused-expressions': 'off',
        'no-use-before-define': 'off',
        'react/prop-types': 'off',
        'no-undef': 'off',
        'prefer-const': 'warn',
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
