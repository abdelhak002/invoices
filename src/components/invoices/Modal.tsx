import { Dispatch, Fragment, useRef, SetStateAction } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { calculateTTCAmount } from '../../helpers'
import { useReactToPrint } from 'react-to-print'
import Template from './Template'

const Modal = ({ isOpen, setIsOpen, openedInvoice }: { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>; openedInvoice: Invoice }) => {
  const invoiceTemplate = useRef(null)

  const printInvoice = useReactToPrint({
    content: () => invoiceTemplate.current,
  })
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-full items-center justify-center p-14 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="min-h-full w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h1" className="text-2xl font-bold italic leading-6 text-gray-900">
                  Facture N&ordm;: {openedInvoice.InvoiceID}
                </Dialog.Title>
                <div className="mt-4 inline-block min-w-full align-middle">
                  <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
                    <table className="relative hidden min-w-full text-gray-900 md:table">
                      <thead className="w-full rounded-lg text-left text-sm font-normal">
                        <tr>
                          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                            Item Libelle
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Unité d&apos;Item
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Quantité d&apos;item
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Prix d&apos;item
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Taxe d&apos;item
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Montant d&apos;item TTC
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {openedInvoice.InvoiceItems.map((invoice) => (
                          <tr
                            key={invoice.ItemID}
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                          >
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                              <div className="flex items-center gap-3">
                                <p>{invoice.ItemLibelle}</p>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">{invoice.ItemUnit}</td>
                            <td className="whitespace-nowrap px-3 py-3">{invoice.ItemQuantity}</td>
                            <td className="whitespace-nowrap px-3 py-3">{invoice.ItemPrice}</td>
                            <td className="whitespace-nowrap px-3 py-3">{invoice.ItemTax} %</td>
                            <td className="whitespace-nowrap px-3 py-3">{calculateTTCAmount(invoice).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="hidden">
                  <Template openedInvoice={openedInvoice} ref={invoiceTemplate} />
                </div>
                <div className="mt-4">
                  <button
                    onClick={printInvoice}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  >
                    Print Facture
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
