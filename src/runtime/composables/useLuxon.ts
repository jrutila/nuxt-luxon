import type { DateTime } from 'luxon'
import { toValue, type Ref } from 'vue'
import type { ParseInput, FormatInputOptions, FormatOutputOptions, LuxonOptions } from '../types'
import { luxFormat, luxParse } from '../core/utils'

import { useRuntimeConfig } from '#app'

type MaybeRef<T> = T | Ref<T> | (() => T)

export function useLuxon(value: MaybeRef<ParseInput>, outuputFormat?: FormatOutputOptions, inputFormat?: FormatInputOptions): string
export function useLuxon(): {
  $luxon: (value: MaybeRef<ParseInput>, outuputFormat?: FormatOutputOptions, inputFormat?: FormatInputOptions) => string
  $lf: (value: MaybeRef<ParseInput>, outuputFormat?: FormatOutputOptions, inputFormat?: FormatInputOptions) => string
  $lp: (value: MaybeRef<ParseInput>, format?: FormatInputOptions) => DateTime
}
export function useLuxon(value?: MaybeRef<ParseInput>, outuputFormat?: FormatOutputOptions, inputFormat?: FormatInputOptions) {
  const options = useRuntimeConfig().public.luxon as Required<LuxonOptions>

  const $luxon = formatter(options)

  if (value !== undefined) {
    return $luxon(value, outuputFormat, inputFormat)
  }

  return { $luxon, $lf: $luxon, $lp: luxParse(options) }
}

function formatter(options: Required<LuxonOptions>) {
  const $luxon = luxFormat(options)

  return (value: MaybeRef<ParseInput>, outuputFormat?: FormatOutputOptions, inputFormat?: FormatInputOptions) => {
    const val = toValue(value)
    return $luxon(val, outuputFormat, inputFormat)
  }
}
