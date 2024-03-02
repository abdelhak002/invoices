import Invoices from './Invoices'
import SideNav from './components/SideNav'

function App() {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <section className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Invoices />
      </section>
    </div>
  )
}

export default App
