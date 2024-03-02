import React, { Ref } from 'react'
import { calculateTTCAmount, formatDateString } from '../../helpers'

const Template = React.forwardRef(({ openedInvoice }: { openedInvoice: Invoice }, ref: Ref<HTMLDivElement>) => {
  return (
    <div className="mt-24" ref={ref}>
      <h1 className="text-center text-2xl font-bold italic leading-6 text-gray-900">Facture N&ordm;: {openedInvoice.InvoiceID}</h1>
      <p className="mx-auto mt-4 w-2/3 text-end">Date de facture: {formatDateString(openedInvoice.InvoiceDate)}</p>
      <div className="mx-auto mt-20 flex w-11/12 justify-center space-x-16">
        <div className="w-2/5">
          <p className="italic">FOURNISSEUR</p>
          <hr className="border-gray-700 text-gray-700" />
          <p className="mt-2 font-medium">{openedInvoice.SupplierBank}</p>
          <p className="">{openedInvoice.SupplierName}</p>
          <p className="">RC: {openedInvoice.SupplierRC}</p>
          <p className="">Tel: {openedInvoice.SupplierPhone}</p>
          <p className="">{openedInvoice.SupplierAddress}</p>
        </div>
        <div className="w-2/5">
          <p className="italic">CLIENT</p>
          <hr className="border-gray-700 text-gray-700" />
          <p className="mt-2 font-medium">{openedInvoice.ClientBank}</p>
          <p className="">{openedInvoice.ClientName}</p>
          <p className="">RC: {openedInvoice.ClientRC}</p>
          <p className="">Tel: {openedInvoice.ClientPhone}</p>
          <p className="">{openedInvoice.ClientAddress}</p>
        </div>
      </div>
      <div className="mt-4 px-10">
        <table className="mx-auto w-11/12 border-collapse text-center">
          <thead>
            <tr className="bg-orange-400">
              <th className="border border-slate-600 font-normal">N&deg;</th>
              <th className="border border-slate-600 font-normal">LIBELLE</th>
              <th className="border border-slate-600 font-normal">QUANTITÉ</th>
              <th className="border border-slate-600 font-normal">PRIX</th>
              <th className="border border-slate-600 font-normal">HT</th>
              <th className="border border-slate-600 font-normal">TTC</th>
            </tr>
          </thead>
          <tbody>
            {openedInvoice.InvoiceItems.map((item) => (
              <tr key={item.ItemID}>
                <td className="border border-slate-600 py-2">{item.ItemID}</td>
                <td className="border border-slate-600 py-2">{item.ItemLibelle}</td>
                <td className="border border-slate-600 py-2">{item.ItemQuantity}</td>
                <td className="border border-slate-600 py-2">{item.ItemPrice}</td>
                <td className="border border-slate-600 py-2">{item.ItemPrice * item.ItemQuantity}</td>
                <td className="border border-slate-600 py-2">{calculateTTCAmount(item).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mx-auto mt-4 flex w-11/12 justify-end">
          <table className="table w-60 border-collapse">
            <tbody>
              <tr className="space-y-4">
                <td className="border border-slate-600 pl-2">Total</td>
                <td className="border border-slate-600 pl-2">
                  {openedInvoice.InvoiceItems.reduce((acc, item) => acc + item.ItemPrice * item.ItemQuantity, 0).toFixed(2)}
                </td>
              </tr>
              <tr className="space-y-4">
                <td className="border border-slate-600 pl-2">TVA</td>
                <td className="border border-slate-600 pl-2">
                  {openedInvoice.InvoiceItems.reduce((acc, item) => acc + (item.ItemPrice * item.ItemQuantity * item.ItemTax) / 100, 0).toFixed(2)}
                </td>
              </tr>
              <tr className="space-y-4">
                <td className="border border-slate-600 pl-2">Total TTC</td>
                <td className="border border-slate-600 pl-2">{openedInvoice.InvoiceItems.reduce((acc, item) => acc + calculateTTCAmount(item), 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="mx-auto mt-32 w-1/2 text-end">LA SIGNATURE</p>
    </div>
  )
})

export default Template
