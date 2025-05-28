// src/app/modules/auth/core/AuthHelpers.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'

// Read the stored AuthModel (with api_token) from localStorage
enum AuthModelKeys { api_token = 'api_token' }
export const getAuth = (): AuthModel | undefined => {
  if (typeof localStorage === 'undefined') return

  const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) return

  try {
    return JSON.parse(lsValue) as AuthModel
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

// Persist the AuthModel (with api_token) into localStorage
export const setAuth = (auth: AuthModel) => {
  if (typeof localStorage === 'undefined') return

  try {
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(auth))
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

// Remove the stored auth
export const removeAuth = () => {
  if (typeof localStorage === 'undefined') return

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

/**
 * Injects interceptors into the given axios instance:
 *  - Requests get an Authorization header if api_token exists
 *  - Responses with status 401 clear auth and redirect to login,
 *    but ignore 401s from login and verify_token endpoints
 */
export function setupAxios(axiosInstance: any) {
  // Always accept JSON
  axiosInstance.defaults.headers.Accept = 'application/json'

  // Attach JWT on every request if present
  axiosInstance.interceptors.request.use(
    (config: { headers: { Authorization?: string } }) => {
      const auth = getAuth()
      if (auth?.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`
      }
      return config
    },
    (err: any) => Promise.reject(err)
  )

  // Compute base URL for correct redirect path
  const BASE = import.meta.env.BASE_URL || '/'

  // Global response handler: on 401, clear auth and redirect
  axiosInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      const status = error.response?.status
      const url = error.config?.url || ''
      // Skip redirect for login and verify_token endpoints
      if (
        status === 401 &&
        !url.endsWith('/login') &&
        !url.endsWith('/verify_token')
      ) {
        // Clear stored auth
        removeAuth()
        // Redirect to login under your base path
        window.location.href = `${window.location.origin}${BASE}auth/login`
      }
      return Promise.reject(error)
    }
  )
}

export { AUTH_LOCAL_STORAGE_KEY }
