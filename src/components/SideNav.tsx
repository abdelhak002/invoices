import clsx from 'clsx'
import { DocumentDuplicateIcon, UsersIcon } from '@heroicons/react/24/solid'

import Logo from './Logo'

const links = [
  {
    name: 'Invoices',
    href: '/',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Customers',
    href: '/#',
    icon: UsersIcon,
  },
]

const SideNav = () => {
  const pathname = window.location.pathname
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <a className="mb-2 flex h-20 items-end justify-start rounded-md bg-gray-50 p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-full">
          <Logo />
        </div>
      </a>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <>
          {links.map((link) => {
            const LinkIcon = link.icon
            return (
              <a
                key={link.name}
                href={link.href}
                className={clsx(
                  'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-500 md:flex-none md:justify-start md:p-2 md:px-3',
                  {
                    'bg-red-100 text-red-500': pathname === link.href,
                  }
                )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </a>
            )
          })}
        </>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  )
}

export default SideNav
