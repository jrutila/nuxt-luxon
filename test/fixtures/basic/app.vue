<template>
  <div>{{ $luxon(now, 'yyyy-MM-dd') }}</div>
</template>

<script setup>
const { $luxon } = useLuxon()
const now = new Date()
</script>
