// src/app/modules/auth/pages/Logout.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './core/Auth'

export function Logout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // clear auth state
    logout()
    // redirect to login
    navigate('/auth/login', { replace: true })
  }, [logout, navigate])

  // nothing to render
  return null
}
