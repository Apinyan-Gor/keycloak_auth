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
    '@scalar/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '@/assets/css/tailwind.css'
  ],
  runtimeConfig: {
    // public runtime config available on client-side as well
    public: {
      docsBase: '/docs',
      // base URL for internal/external API calls used by the api-party plugin
      apiBase: '/api/v1',
      // optional default token (for development only)
      apiToken: ''
    }
  },
  // nuxt-api-party example configuration (module-specific options may vary)
  apiParty: ({
    clients: {
      default: {
        baseURL: process.env.API_BASE || 'http://localhost:3000/api/v1',
        // token will be set at runtime by the client plugin
      }
    }
  } as any),
  scalar: ({
    // auto-generate OpenAPI from server routes and expose Swagger UI at /docs
    openapi: {
      // where generated spec will be served
      path: '/docs/openapi.json',
      // swagger-ui path
      ui: {
        path: '/docs'
      }
    }
  } as any),
  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'ru', language: 'ru-RU' }
    ],
    defaultLocale: 'en',
  }
})