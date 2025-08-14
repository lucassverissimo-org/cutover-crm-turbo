import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { ReleaseProvider } from './context/ReleaseContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReleaseProvider>
      <App />
    </ReleaseProvider>
  </StrictMode>,
)
