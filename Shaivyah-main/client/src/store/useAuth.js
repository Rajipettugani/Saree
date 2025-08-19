import { create } from 'zustand'
import { api, setAuthToken } from '../lib/api'

export const useAuth = create((set) => ({
  user: null,
  token: null,
  async login(email, password) {
    const { data } = await api.post('/api/auth/login', { email, password })
    set({ user: data.user, token: data.token })
    setAuthToken(data.token)
  },
  logout(){ set({ user:null, token:null }); setAuthToken(null) }
}))
