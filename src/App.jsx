
import { useState } from 'react'
import { Bell, Search, Menu } from 'lucide-react'

import Sidebar from './components/Sidebar'
import DashboardStats from './components/DashboardStats'
import CustomerForm from './components/CustomerForm'
import CustomerEntryForm from './components/CustomerEntryForm'
import CourierReport from './components/CourierReport'
import RecentCustomers from './components/RecentCustomers'

function App() {
  const [courierResult, setCourierResult] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <Sidebar />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 bg-white rounded-lg">
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Dashboard
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Welcome back! Manage your courier checks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-gray-100 rounded-xl">
              <Search size={19} />
            </button>

            <button className="p-3 bg-white border border-gray-100 rounded-xl">
              <Bell size={19} />
            </button>

            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
              S
            </div>
          </div>
        </header>

        {/* Statistics */}
        <section className="mb-7">
          <DashboardStats />
        </section>

        {/* Section 1: Courier History Check */}
        <section className="mb-7">
          <CustomerForm onResult={setCourierResult} />
        </section>

        {/* Courier Report */}
        {courierResult && (
          <section className="mb-7">
            <CourierReport result={courierResult} />
          </section>
        )}

        {/* Section 2: Customer Entry */}
        <section className="mb-7">
          <CustomerEntryForm />
        </section>

        {/* Recent Customers */}
        <section>
          <RecentCustomers />
        </section>

        <footer className="text-center text-xs text-gray-400 mt-10">
          CourierCheck Management System © 2026
        </footer>

      </main>
    </div>
  )
}

export default App
