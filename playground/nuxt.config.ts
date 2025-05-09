export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  luxon: {
    templates: {
      my_template: {
        format: 'yyyy___MM______dd',
      },
    },
  },
})
