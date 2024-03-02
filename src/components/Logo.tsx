import { GlobeAltIcon } from '@heroicons/react/24/solid'

const Logo = () => {
  return (
    <div className="flex flex-row items-center leading-none text-red-500">
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="font-serif text-[44px]">Logo</p>
    </div>
  )
}

export default Logo
