import { useState } from 'react'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ProjectDrawer } from './components/ProjectDrawer'
import { Skills } from './components/Skills'
import { Work } from './components/Work'
import { DrawerContext } from './drawer'

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <DrawerContext.Provider value={setOpenId}>
      <Navbar />
      <main id="main">
        <Hero />
        <Experience />
        <Work />
        <Skills />
        <Education />
      </main>
      <Footer />
      <ProjectDrawer projectId={openId} onClose={() => setOpenId(null)} />
    </DrawerContext.Provider>
  )
}
