import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const STORAGE_KEY = 'api_party_token'

  function getToken() {
    try { return localStorage.getItem(STORAGE_KEY) }
    catch (e) { return null }
  }
  function setToken(token: string | null) {
    try {
      if (token) localStorage.setItem(STORAGE_KEY, token)
      else localStorage.removeItem(STORAGE_KEY)
    } catch (e) {}
  }

  async function request(input: string, init: RequestInit = {}) {
    const token = getToken() || config.public?.apiToken || null
    const headers = new Headers(init.headers || {})
    if (token) headers.set('Authorization', `Bearer ${token}`)
    // support relative paths to API
    const base = config.public?.apiBase || ''
    const url = input.startsWith('/') && base ? `${base}${input}` : input
    return $fetch(url, { ...init, headers })
  }

  nuxtApp.provide('apiParty', {
    getToken,
    setToken,
    request
  })
})
