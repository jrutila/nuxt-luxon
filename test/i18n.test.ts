import { describe, expect, it, vi } from 'vitest'
import defu from 'defu'
import { ref } from 'vue'
import { makeFormatter, makeParser } from '../src/runtime/core'
import { DEFAULT_OPTIONS } from '../src/module'
import type { LuxonOptions } from '../src/runtime/types'
import { setLuxonVueI18nUseI18n } from '../src/runtime/core/format'
import type { ModuleOptions } from 'nuxt/schema'

function init(_options: ModuleOptions = {}) {
  const options = defu(_options, DEFAULT_OPTIONS) as Required<ModuleOptions>
  const $luxon = makeFormatter(options as Required<LuxonOptions>)
  const $lp = makeParser(options as Required<LuxonOptions>)
  return { $luxon, $lp }
}

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: ref('it'),
  }),
}))

describe('nuxt-i18n datetimes', () => {
  it('format with i18n locale', () => {
    setLuxonVueI18nUseI18n(() => ({ locale: ref('it') }))
    const { $luxon } = init({
      output: {
        zone: 'utc',
        locale: 'i18n',
      },
    })

    const date = '2024-07-12T12:23:49.000Z'
    const outputs = [
      { format: 'full', expected: '12 luglio 2024 alle ore 12:23 UTC' },
    ]

    for (const { format, expected } of outputs) {
      expect($luxon(date, format)).toBe(expected)
    }
  })
  it('format with explicit useI18n', () => {
    setLuxonVueI18nUseI18n(() => ({ locale: ref('it') }))
    const { $luxon } = init({
      output: {
        zone: 'utc',
        locale: 'fi',
      },
      useI18n: true,
    })

    const date = '2024-07-12T12:23:49.000Z'
    const outputs = [
      { format: 'full', expected: '12. heinäkuuta 2024 klo 12.23 UTC' },
      { format: { format: 'full', locale: 'i18n' }, expected: '12 luglio 2024 alle ore 12:23 UTC' },
    ]
    for (const { format, expected } of outputs) {
      expect($luxon(date, format)).toBe(expected)
    }
  })
})
