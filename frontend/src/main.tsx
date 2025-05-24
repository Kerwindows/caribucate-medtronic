// src/main.tsx
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './app/redux/store'

// Metronic imports
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
import './_metronic/assets/sass/style.scss'

// App components
import { AppRoutes } from './app/routing/AppRoutes'
import { AuthProvider, AuthInit, setupAxios } from './app/modules/auth'

// Initialize libraries
setupAxios(axios)
Chart.register(...registerables)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      refetchOnWindowFocus: false,
    }
  }
})

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <MetronicI18nProvider>
          <AuthProvider>
            <AuthInit>
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <AppRoutes />
              </BrowserRouter>
            </AuthInit>
          </AuthProvider>
        </MetronicI18nProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  )
}