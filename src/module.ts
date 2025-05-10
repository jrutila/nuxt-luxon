import { defineNuxtModule, createResolver, addImportsDir } from '@nuxt/kit'
import { DateTime } from 'luxon'
import type { LuxonOptions } from './runtime/types'

const templates = {
  full: { format: DateTime.DATETIME_FULL },
  fulls: { format: DateTime.DATETIME_FULL_WITH_SECONDS },
  huge: { format: DateTime.DATETIME_HUGE },
  huges: { format: DateTime.DATETIME_HUGE_WITH_SECONDS },
  med: { format: DateTime.DATETIME_MED },
  meds: { format: DateTime.DATETIME_MED_WITH_SECONDS },
  short: { format: DateTime.DATETIME_SHORT },
  shorts: { format: DateTime.DATETIME_SHORT_WITH_SECONDS },
  date_full: { format: DateTime.DATE_FULL },
  date_huge: { format: DateTime.DATE_HUGE },
  date_med: { format: DateTime.DATE_MED },
  date_medd: { format: DateTime.DATE_MED_WITH_WEEKDAY },
  date: { format: DateTime.DATE_SHORT },
  date_short: { format: DateTime.DATE_SHORT },
  time24: { format: DateTime.TIME_24_SIMPLE },
  time24longoffset: { format: DateTime.TIME_24_WITH_LONG_OFFSET },
  time24s: { format: DateTime.TIME_24_WITH_SECONDS },
  time: { format: DateTime.TIME_SIMPLE },
  times: { format: DateTime.TIME_WITH_SECONDS },
}

export const DEFAULT_OPTIONS: LuxonOptions = {
  input: {
    zone: 'utc',
    format: 'iso',
  },
  output: {
    format: 'short',
  },
  templates,
}

export default defineNuxtModule<LuxonOptions>({
  meta: {
    name: 'nuxt-luxon',
    configKey: 'luxon',
  },
  defaults: DEFAULT_OPTIONS,
  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)
    // @ts-expect-error don't know how to type this
    _nuxt.options.runtimeConfig.public.luxon = _options
    addImportsDir(resolve('./runtime/composables'))
  },
})
