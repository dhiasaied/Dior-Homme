import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { useAppStore } from './store/useAppStore'
import { applyPaletteVars } from './hooks/usePalette'
import './styles/global.css'

// Paint the saved palette before the first frame (no colour flash on load).
applyPaletteVars(useAppStore.getState().palette)

// Every visit starts at the top so the intro and scroll choreography line up.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
