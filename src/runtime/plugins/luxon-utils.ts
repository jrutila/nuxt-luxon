import { defineNuxtPlugin, useLuxon } from '#imports'

export default defineNuxtPlugin(() => {
  const { $luxon, $lp } = useLuxon()

  return {
    provide: {
      luxon: $luxon,
      lf: $luxon,
      lp: $lp,
    },
  }
})
