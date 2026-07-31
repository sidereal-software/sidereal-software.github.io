import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/oxanium'
import '@fontsource-variable/merriweather'
import '@fontsource-variable/fira-code'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
