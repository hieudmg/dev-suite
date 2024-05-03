/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 120,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  singleAttributePerLine: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "", // Empty line
    "^@plasmo/(.*)$",
    "",
    "^@plasmohq/(.*)$",
    "",
    "^~(.*)$",
    "",
    "^[./]"
  ]
}
