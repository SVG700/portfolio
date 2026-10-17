import { createContext, useContext } from 'react'

/** Lets any section open the project overview drawer by project id. */
export const DrawerContext = createContext<(id: string) => void>(() => {})

export const useOpenProject = () => useContext(DrawerContext)
