import { createI18n } from 'vue-i18n'

const localeFiles = import.meta.glob('../../locales/*.json', { eager: true })

const messages = Object.fromEntries(
  Object.entries(localeFiles)
    .map(([key, value]) => {
      const defaultImport = (value as any).default

      if (!defaultImport) return ['', {}]

      return [key.slice(14, -5), defaultImport]
    })
    .filter(([key]) => key.length > 0)
)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
})

export default i18n
