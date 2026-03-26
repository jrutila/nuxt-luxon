import { describe, expect, it, vi } from 'vitest'
import defu from 'defu'
import { ref } from 'vue'
import { makeFormatter, makeParser } from '../src/runtime/core'
import { DEFAULT_OPTIONS } from '../src/module'
import type { LuxonOptions } from '../src/runtime/types'

function init(_options: LuxonOptions = {}) {
  const options = defu(_options, DEFAULT_OPTIONS) as Required<LuxonOptions>
  const $luxon = makeFormatter(options)
  const $lp = makeParser(options)
  return { $luxon, $lp }
}

describe('nuxt-i18n datetimes', () => {
  it('format', () => {
    vi.mock('vue-i18n', () => ({
      useI18n: () => ({
        locale: ref('it'),
      }),
    }))

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
})
