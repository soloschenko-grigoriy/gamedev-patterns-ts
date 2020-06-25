module.exports = {
    root: true,
    env: {
        browser: true,
        jest: true,
        es6: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    // add your custom rules here
    rules: {
        'semi': [
            'error',
            'never'
        ],
        'quotes': [
            'error',
            'single'
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: false,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: true,
            }
        ],
        '@typescript-eslint/interface-name-prefix': [
            'error',
            'always'
        ],
        'no-unused-vars': 'off', // note you must disable the base rule as it can report incorrect errors
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                'vars': 'all',
                'args': 'none',
                'ignoreRestSiblings': false
            }
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'none',
                    'requireLast': false
                },
                'singleline': {
                    'delimiter': 'semi',
                    'requireLast': false
                }
            }
        ]
    },
    overrides: [
        {
            'files': ['*.js'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
            }
        }
    ]
}
