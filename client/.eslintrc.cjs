module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:import/recommended",
		"airbnb",
		"airbnb-typescript",
		"plugin:prettier/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:react/jsx-runtime",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		project: "tsconfig.json",
		sourceType: "module",
	},
	settings: {
		"import/resolver": {
			node: {
				paths: ["src"],
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	plugins: ["react-refresh"],
	rules: {
		"no-underscore-dangle": ["error", { allow: ["_id"] }],
		"react/jsx-props-no-spreading": "off",
		"react-refresh/only-export-components": "warn",
		"no-param-reassign": ["error", { props: false }],
		"react/function-component-definition": [
			2,
			{
				namedComponents: "function-declaration",
			},
		],
	},
};
