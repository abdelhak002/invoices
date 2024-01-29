import { ReactNode, createContext, useEffect, useState } from 'react'

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('site-theme')
    if (typeof storedPrefs === 'string') return storedPrefs

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) return 'dark'
  }

  return 'light'
}

export const ThemeContext = createContext({})

export const ThemeProvider = ({ initialTheme, children }: { initialTheme?: string; children: ReactNode }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement
    const isDark = rawTheme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(rawTheme)

    localStorage.setItem('site-theme', rawTheme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
