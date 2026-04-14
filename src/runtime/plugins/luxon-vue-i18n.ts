import type { Ref } from 'vue'
import { defineNuxtPlugin } from '#app'
import { setLuxonVueI18nUseI18n } from '../core/format'

export default defineNuxtPlugin({
  name: 'nuxt-luxon-vue-i18n',
  async setup() {
    try {
      const { useI18n } = await import('vue-i18n')
      setLuxonVueI18nUseI18n(useI18n as () => { locale: Ref<string> })
    }
    catch {
      setLuxonVueI18nUseI18n(undefined)
    }
  },
})
