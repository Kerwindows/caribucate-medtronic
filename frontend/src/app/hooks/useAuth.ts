// src/app/hooks/useAuth.ts
import { useAppDispatch, useAppSelector } from '../store'
import { verifyToken } from '../../api/auth.api'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { token, isAuthenticated, loading } = useAppSelector((state) => state.auth)

  const login = async (credentials: { email: string; password: string }) => {
    try {
      dispatch(setAuthLoading(true))
      const response = await axios.post('/api/login', credentials)
      dispatch(setCredentials(response.data.token))
      return response.data.user
    } catch (error) {
      dispatch(setAuthError(error.message))
      throw error
    } finally {
      dispatch(setAuthLoading(false))
    }
  }

  const logout = () => {
    dispatch(clearCredentials())
  }

  return {
    token,
    isAuthenticated,
    loading,
    login,
    logout
  }
}