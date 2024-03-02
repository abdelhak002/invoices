import { useState } from 'react'
import Search from './components/Search'
import Table from './components/invoices/Table'

const Invoices = () => {
  //  ftech invoices from remote api
  const [invoices, setInvoices] = useState<Invoice[]>([])

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-serif text-4xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search setInvoices={setInvoices} />
      </div>
      <Table data={invoices} />
    </div>
  )
}

export default Invoices
