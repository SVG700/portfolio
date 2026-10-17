import { useState } from 'react'
import { About } from './components/About'
import { Achievements } from './components/Achievements'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ProjectDrawer } from './components/ProjectDrawer'
import { Skills } from './components/Skills'
import { Work } from './components/Work'
import { DrawerContext } from './drawer'
import { useReveal } from './hooks'

export default function App() {
  useReveal()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <DrawerContext.Provider value={setOpenId}>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Skills />
        <Achievements />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ProjectDrawer projectId={openId} onClose={() => setOpenId(null)} />
    </DrawerContext.Provider>
  )
}
