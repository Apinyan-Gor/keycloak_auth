// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    'nuxt-schema-org',
    'nuxt-security',
    'nuxt-api-party',
    '@nuxtjs/html-validator',
    '@scalar/nuxt'
  ],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'ru', language: 'ru-RU' }
    ],
    defaultLocale: 'en',
  }
})