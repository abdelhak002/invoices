import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const Search = ({ setInvoices }: { setInvoices: Dispatch<SetStateAction<Invoice[]>> }) => {
  const [invoices, setOriginalInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    fetch('https://elhoussam.github.io/invoicesapi/db.json')
      .then((response) => response.json())
      .then((data) => {
        setOriginalInvoices(data)
        setInvoices(data)
      })
  }, [setInvoices])

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setInvoices(invoices)
    } else {
      const filteredInvoices = invoices.filter((invoice) => invoice.InvoiceID.toString().includes(query))
      setInvoices(filteredInvoices)
    }
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        autoFocus={true}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-none outline-2 placeholder:text-gray-500 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
        placeholder="Type to search..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}

export default Search
