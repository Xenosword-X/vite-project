<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale } = useI18n()

const options = [
  { value: 'zh-TW', label: '繁中' },
  { value: 'en',    label: 'EN' },
  { value: 'ja',    label: '日本語' }
]

const current = computed({
  get: () => locale.value,
  set: async (val) => { await setLocale(val) }
})
</script>

<template>
  <select v-model="current" class="form-select form-select-sm" style="width:110px">
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>