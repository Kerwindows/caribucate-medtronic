// src/api/auth.api.ts
import axios from 'axios'

// Default export - axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Named exports
export const verifyToken = async (token: string) => {
  try {
    store.dispatch(setAuthLoading(true))
    const response = await api.get('/verify_token', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data.user
  } catch (error) {
    throw error
  } finally {
    store.dispatch(setAuthLoading(false))
  }
}

export default api // Add this line