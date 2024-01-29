import ThemeToggle from './ThemeToggle'
import { FacebookIcon, GithubIcon, XIcon } from './assets/icons/SocialMediaIcons'

const Footer = () => {
  return (
    <div className="mt-2 flex flex-col items-center space-y-2 border-t border-gray-300 py-4 dark:border-gray-800 sm:flex-row sm:justify-between sm:space-y-0">
      <p className="text-center text-gray-700 dark:text-white">Copyrigth &copy; 2023 Agendify | Darbeida Abdelhak</p>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <a className="text-gray-700 dark:text-white" href="http://github.com/abdelhak002" target="_blank">
          <GithubIcon />
        </a>
        <a className="text-gray-700 dark:text-white" href="https://twitter.com/Abdelha55342728" target="_blank">
          <XIcon />
        </a>
        <a className="text-gray-700 dark:text-white" href="https://web.facebook.com/ABDELHAK.DARBEIDA/" target="_blank">
          <FacebookIcon />
        </a>
      </div>
    </div>
  )
}

export default Footer
