import { useState } from 'react'
import { calculateTTCAmount, formatDateString } from '../../helpers'
import Modal from './Modal'

const Table = ({ data }: { data: Invoice[] }) => {
  const [openedInvoice, setOpenedInvoice] = useState<Invoice | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleInvoiceClick = (invoice: Invoice) => {
    setOpenedInvoice(invoice)
    setIsOpen(true)
  }

  return (
    <div className="mt-6 flow-root">
      {openedInvoice && <Modal isOpen={isOpen} setIsOpen={setIsOpen} openedInvoice={openedInvoice} />}
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
          <div className="md:hidden">
            {data?.map((invoice) => (
              <div key={invoice.InvoiceID} onClick={() => handleInvoiceClick(invoice)} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>Facture Id: {invoice.InvoiceID}</p>
                    </div>
                    <p className="text-sm text-gray-500">Client Nom: {invoice.ClientName}</p>
                    <p className="text-sm text-gray-500">Fournisseur Nom: {invoice.SupplierName}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">TTC: {invoice.InvoiceItems.reduce((acc, item) => acc + calculateTTCAmount(item), 0).toFixed(2)}</p>
                    <p>{formatDateString(invoice.InvoiceDate)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="relative hidden min-w-full text-gray-900 md:table">
            <thead className="sticky top-0 w-full rounded-lg bg-gray-100 text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Facture Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Facture Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Client Nom
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fournisseur Nom
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Montant TTC
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((invoice) => (
                <tr
                  key={invoice.InvoiceID}
                  className="w-full border-b py-3 text-sm last-of-type:border-none hover:cursor-pointer hover:bg-gray-50 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  onClick={() => handleInvoiceClick(invoice)}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{invoice.InvoiceID}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{formatDateString(invoice.InvoiceDate)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{invoice.ClientName}</td>
                  <td className="whitespace-nowrap px-3 py-3">{invoice.SupplierName}</td>
                  <td className="whitespace-nowrap px-3 py-3">{invoice.InvoiceItems.reduce((acc, item) => acc + calculateTTCAmount(item), 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
