import type { ParseInput, FormatInputOptions, FormatOutputOptions, LuxonOptions } from '../types'
import { luxFormat, luxParse } from '../core/utils'

import { useRuntimeConfig } from '#app'

export function useLuxon(value?: ParseInput, outuputFormat?: FormatOutputOptions, inputFormat?: FormatInputOptions) {
  const options = useRuntimeConfig().public.luxon as Required<LuxonOptions>

  const $luxon = luxFormat(options)

  if (value !== undefined) {
    return $luxon(value, outuputFormat, inputFormat)
  }

  return { $luxon, $lf: $luxon, $lp: luxParse(options) }
}
