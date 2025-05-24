// src/app/routing/AppRoutes.tsx
import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage, useAuth } from '../modules/auth'
import { App } from '../App'

export const AppRoutes: FC = () => {
  const { currentUser } = useAuth()

  return (
    <Routes>
      <Route element={<App />}>
        {/* Public error & logout */}
        <Route path='error/*' element={<ErrorsPage />} />
        <Route path='logout' element={<Logout />} />

        {currentUser ? (
          // Authenticated → private section
          <>
            <Route path='/*' element={<PrivateRoutes />} />
            <Route index element={<Navigate to='/dashboard' replace />} />
          </>
        ) : (
          // Not logged in → auth pages
          <>
            <Route path='auth/*' element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/auth' replace />} />
          </>
        )}
      </Route>
    </Routes>
  )
}
