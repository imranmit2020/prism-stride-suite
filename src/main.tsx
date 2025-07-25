import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalizationProvider } from './contexts/GlobalizationContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalizationProvider>
      <App />
    </GlobalizationProvider>
  </StrictMode>,
)
