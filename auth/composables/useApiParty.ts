export function useApiParty() {
  const nuxt = useNuxtApp()
  const api = nuxt.$apiParty as any

  function setToken(token: string | null) {
    api?.setToken(token)
  }
  function getToken() {
    return api?.getToken()
  }
  async function request(path: string, opts: any = {}) {
    return api?.request(path, opts)
  }

  return { setToken, getToken, request }
}
