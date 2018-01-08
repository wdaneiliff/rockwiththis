const path = require('path');

module.exports = {
    'extends': 'airbnb',

    'env': {
         'browser': true,
    },
    'globals': {
        'fetch': false,
    },
    'rules': {
        'no-console': 0,
        'camelcase': 0,
        'class-methods-use-this': 0,
        'global-require': 0,
        'import/extensions': 0,
        'import/no-extraneous-dependencies': 0,
        'import/prefer-default-export': 0,
        'indent': ['error', 4],
        'max-len': 0,
        'no-else-return': 0,
        'no-fallthrough': [1],
        'no-plusplus': 0,
        'no-undef': 0,
        'no-underscore-dangle': 0,
        'no-unused-vars': 0,
        'no-use-before-define': 0,
        "react/forbid-prop-types": [1],
        'react/jsx-boolean-value': [2, 'always'],
        'react/jsx-indent': [1, 4],
        "react/jsx-indent-props": [1, 4],
        'react/jsx-filename-extension': 0,
        'react/no-unescaped-entities': 0,
        'react/no-multi-comp': 0,
        'react/prefer-stateless-function': 0,
        'semi': ['error', 'never'],
        'space-before-function-paren': 0,
    },
    'settings': {
        'import/resolver': {
           "babel-module": {}
        }
    }
}
