module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 9,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},

	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],
	plugins: ['@typescript-eslint', 'prettier', 'import'],
	env: {
		node: true,
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {},
		},
		react: {
			version: 'detect',
		},
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': 0,
		'react/jsx-filename-extension': [
			2,
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		],
		'import/no-extraneous-dependencies': [
			2,
			{
				devDependencies: ['**/test.tsx', '**/test.ts'],
			},
		],
		'handle-callback-err': 0,
		'no-undef': 2,
		'no-unsafe-finally': 0,
		'no-use-before-define': 0,
		'import/no-unresolved': 2,
		'import/namespace': [
			1,
			{
				allowComputed: true,
			},
		],
		'import/named': 1,
		'import/no-named-default': 0,
		'import/default': 1,
		'import/export': 1,
		'import/exports-last': 0,
		'import/order': 0,
		'import/newline-after-import': 0,
		'no-useless-escape': 0,
		'react/jsx-indent': 0,
		'react/prop-types': 0,
		'react/jsx-indent-props': 0,
		camelcase: 0,
		'no-return-await': 0,
		'no-constant-condition': 0,
		'no-unused-vars': 0,
		curly: ['error', 'all'],
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				semi: false,
				printWidth: 120,
				useTabs: true,
				trailingComma: 'es5',
				jsxBracketSameLine: false,
				jsxSingleQuote: true,
			},
		],
	},
}
