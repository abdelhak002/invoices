export const calculateTTCAmount = (item: InvoiceItems) => item.ItemPrice * item.ItemQuantity + (item.ItemPrice * item.ItemQuantity * item.ItemTax) / 100
export const formatDateString = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })
}
