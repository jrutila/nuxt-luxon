import type { ParseInput, FormatInputOptions, FormatOutputOptions } from '../types'
import { luxFormat, luxParse } from '../core/utils'

export function useLuxon(value?: ParseInput, outuputFormat?: FormatOutputOptions, inputFormat?: FormatInputOptions) {
  const options = useRuntimeConfig().public.luxon

  const $luxon = luxFormat(options)

  if (value !== undefined) {
    return $luxon(value, outuputFormat, inputFormat)
  }

  return { $luxon, $lf: $luxon, $lp: luxParse(options) }
}
