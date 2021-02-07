module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    // tell Jest to handle `*.vue` files
    "vue",
  ],
  transform: {
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.[tj]s$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!vuetify/src/locale)"],
}
