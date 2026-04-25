import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { InvoiceProvider } from './context/InvoiceContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <InvoiceProvider>
        <App />
      </InvoiceProvider>
    </ThemeProvider>
  </StrictMode>,
)
