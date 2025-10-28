// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: '.',
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    'nuxt-schema-org',
    'nuxt-security',
    'nuxt-api-party',
    '@scalar/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '@/assets/css/tailwind.css'
  ],
  vite: {
    optimizeDeps: {
      include: ['debug']
    },
    server:{
      hmr:{
        overlay: true
      }
    },
  },
  typescript: {
    compilerOptions: {
      types: ["node"],
    },
    files: [],
    references: [
      { path: "./.nuxt/tsconfig.app.json"},
      { path: "./.nuxt/tsconfig.server.json"},
      { path: "./.nuxt/tsconfig.shared.json"},
      { path: "./.nuxt/tsconfig.node.json"}
    ]
  },
  runtimeConfig: {

    public: {
      docsBase: '/docs',
      apiBase: process.env.API_BASE+process.env.API_PATH || '/api/v1',
      apiToken: process.env.API_TOKEN,
      siteUrl: process.env.URL || 'http://localhost:3000',
      keycloak:{
        realm: process.env.KEYCLOAK_REALM,
        username: process.env.KEYCLOAK_USER || process.env.KEYCLOAK_ADMIN,
        password: process.env.KEYCLOAK_PASSWORD || process.env.KEYCLOAK_ADMIN_PASSWORD,
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      }
    }
  },
  nitro: {
    experimental: {
      openAPI: true
    },
    // routeRules: {
    //   // Прокси для /keycloak/** на Keycloak внутри Docker
    //   '/keycloak/**': {
    //     proxy: {
    //       to: 'http://localhost:8180/keycloak/**',  // Оставь как есть
    //       // changeOrigin: true,  // Изменяет Host-заголовок на keycloak:8080 (может помочь)
    //       // secure: false,  // Игнорирует SSL-проверку (если Keycloak без HTTPS)
    //       // headers: {
    //       //   'Host': 'localhost:8180',  // Имитирует запрос на хост-порт (может помочь с субпутем)
    //       //   'X-Forwarded-Host': 'localhost:3001',  // Для прокси
    //       //   'X-Forwarded-Proto': 'http',  // Указывает протокол
    //       // },
    //     }
    //   }
    // }
  },
  scalar: {
    openapi: {
      path: '/docs/openapi.json',
      ui: {
        path: '/docs',
        locale: false
      }
    }
  },
  apiParty: {
    endpoints: {
      apiKeycloak: {
        url: process.env.API_BASE+process.env.API_PATH || '${origin}/api/v1',
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      }
    },
    client: true
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'ru', language: 'ru-RU' }
    ],
    defaultLocale: 'en',
  },
  security: {
    headers: {
      contentSecurityPolicy: false,
    },
    corsHandler: {
      origin: '*',
    }
  }
})