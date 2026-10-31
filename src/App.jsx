import { useCallback, useState } from 'react'
import Experience from './three/Experience'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ColorSelector from './components/ColorSelector'
import Cursor from './components/Cursor'
import Toast from './components/Toast'
import Hero from './sections/Hero'
import Story from './sections/Story'
import Notes from './sections/Notes'
import Craft from './sections/Craft'
import Shop from './sections/Shop'
import Footer from './sections/Footer'
import { useAppStore } from './store/useAppStore'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useScrollChoreography } from './hooks/useScrollChoreography'
import { usePaletteSync } from './hooks/usePalette'
import { usePointer } from './hooks/usePointer'

export default function App() {
  const loaded = useAppStore((s) => s.loaded)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const togglePalette = useCallback(() => setPaletteOpen((o) => !o), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  usePaletteSync()
  usePointer()
  useSmoothScroll(loaded)
  useScrollChoreography(loaded)

  return (
    <>
      <Experience />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div id="hotspot-layer" className="hotspot-layer no-webgl" />

      <Navbar onOpenPalette={togglePalette} />
      <main className="content">
        <Hero />
        <Story />
        <Notes />
        <Craft />
        <Shop />
      </main>
      <Footer />

      <ColorSelector open={paletteOpen} onToggle={togglePalette} onClose={closePalette} />
      <Toast />
      <Cursor />
      <Loader />
    </>
  )
}
