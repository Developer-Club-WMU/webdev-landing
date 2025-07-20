/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierConfig = {
    plugins: ["prettier-plugin-tailwindcss"],
    tabWidth: 2,
    useTabs: false,
    printWidth: 80,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    arrowParens: "always",
};
export default prettierConfig;
