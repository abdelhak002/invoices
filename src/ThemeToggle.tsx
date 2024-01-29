import { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import { MoonIcon, SunIcon } from './assets/icons/ThemeIcons'

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  if (theme === 'dark') {
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex w-full items-center space-x-2 rounded-lg border border-transparent p-1 text-sm text-white transition-all duration-200 ease-in-out hover:border-gray-700 hover:bg-gray-800 hover:shadow hover:shadow-gray-800"
      >
        <SunIcon className="h-6 w-6" />
      </button>
    )
  } else {
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex w-full items-center space-x-2 rounded-lg border border-transparent p-1 text-sm text-gray-700 transition-all duration-200 ease-in-out hover:border-gray-300 hover:bg-white hover:shadow"
      >
        <MoonIcon className="h-6 w-6" />
      </button>
    )
  }
}

export default ThemeToggle
