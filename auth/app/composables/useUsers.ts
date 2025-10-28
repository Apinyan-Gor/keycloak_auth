import { useApiParty } from './useApiParty'

export function useUsersApi() {
  const api = useApiParty()

  const list = async () => {
    const res = await api.request('/users')
    return res?.data || []
  }

  const get = async (id: number | string) => {
    const res = await api.request(`/users/${id}`)
    return res?.data
  }

  const create = async (payload: { name: string; email: string }) => {
    const res = await api.request('/users', { method: 'POST', body: payload })
    return res?.data
  }

  const update = async (id: number | string, payload: any) => {
    const res = await api.request(`/users/${id}`, { method: 'PUT', body: payload })
    return res?.data
  }

  const remove = async (id: number | string) => {
    await api.request(`/users/${id}`, { method: 'DELETE' })
  }

  return { list, get, create, update, remove }
}
