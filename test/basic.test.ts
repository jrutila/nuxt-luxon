import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

import { DateTime } from 'luxon'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const today = DateTime.now().toFormat('yyyy-MM-dd')
    const html = await $fetch('/')
    expect(html).toContain(`<div>${today}</div>`)
  })
})
