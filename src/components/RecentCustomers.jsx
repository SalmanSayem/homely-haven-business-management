
import { Clock, Eye } from 'lucide-react'

const RecentCustomers = () => {

  const customers = [
    {
      name: 'Rahim Ahmed',
      phone: '01712345678',
      parcels: 25,
      success: '92%',
      status: 'Low Risk'
    },
    {
      name: 'Karim Hasan',
      phone: '01812345678',
      parcels: 18,
      success: '65%',
      status: 'Medium Risk'
    },
    {
      name: 'Sakib Hossain',
      phone: '01912345678',
      parcels: 40,
      success: '35%',
      status: 'High Risk'
    }
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-bold">Recent Customers</h2>
          <p className="text-sm text-gray-500 mt-1">
            Recently checked customers
          </p>
        </div>

        <Clock size={20} className="text-gray-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">

          <thead>
            <tr className="text-gray-500 border-b border-gray-100">
              <th className="py-3">Customer</th>
              <th className="py-3">Parcels</th>
              <th className="py-3">Success</th>
              <th className="py-3">Risk</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.phone} className="border-b border-gray-50">

                <td className="py-4">
                  <p className="font-semibold text-gray-800">
                    {customer.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {customer.phone}
                  </p>
                </td>

                <td className="py-4">{customer.parcels}</td>

                <td className="py-4 font-semibold">
                  {customer.success}
                </td>

                <td className="py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    customer.status === 'Low Risk'
                      ? 'bg-green-50 text-green-600'
                      : customer.status === 'Medium Risk'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {customer.status}
                  </span>
                </td>

                <td className="py-4">
                  <button
                    type="button"
                    title="Demo action"
                    className="p-2 bg-gray-100 rounded-lg text-gray-600"
                    disabled
                  >
                    <Eye size={17} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default RecentCustomers

