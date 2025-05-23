export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-05-23',
  luxon: {
    templates: {
      my_template: {
        format: 'yyyy___MM______dd',
      },
    },
  },
})
