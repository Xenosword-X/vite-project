import { createI18n } from 'vue-i18n'

const LS_KEY = 'locale'

export function detectLocale () {
  const fromLS = localStorage.getItem(LS_KEY)
  if (fromLS) return fromLS
  const nav = navigator.language || ''
  if (['zh-TW', 'zh-CN', 'zh'].some(x => nav.startsWith(x))) return 'zh-TW'
  if (nav.startsWith('ja')) return 'ja'
  return 'en'
}

export async function loadLocaleMessages (locale) {
  const messages = await import(`./locales/${locale}.json`)
  return messages.default
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: {} // 懶載入後再填
})

export async function setLocale (locale) {
  const messages = await loadLocaleMessages(locale)
  i18n.global.setLocaleMessage(locale, messages)
  i18n.global.locale.value = locale
  localStorage.setItem(LS_KEY, locale)
  document.documentElement.lang = locale
}

export async function bootstrapI18n () {
  await setLocale(i18n.global.locale.value)
}