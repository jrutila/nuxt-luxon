<template>
  <div>
    <h1>nuxt-luxon</h1>

    <h2>formats</h2>
    <ul>
      <li
        v-for="format in formats"
        :key="format"
      >
        {{ format }}: {{ $luxon(now, format) }}
      </li>
    </ul>

    <h2>parse</h2>
    <input
      v-model="date"
      type="date"
    >
    +2 days = {{ plusTwoDays }}
  </div>
</template>

<script setup>
const { $luxon, $lp } = useLuxon()

const now = new Date()
const formats = [
  'full',
  'fulls',
  'huge',
  'huges',
  'med',
  'meds',
  'short',
  'shorts',
  'date_full',
  'date_huge',
  'date_med',
  'date_medd',
  'date',
  'date_short',
  'time24',
  'time24longoffset',
  'time24s',
  'time',
  'times',
  'yyyy-MM-dd',
  'my_template',
]

const date = ref(null)

const plusTwoDays = computed(() => {
  if (!date.value) return null
  const parsedDate = $lp(date.value)
  return $luxon(parsedDate.plus({ days: 2 }), 'yyyy-MM-dd')
})
</script>
