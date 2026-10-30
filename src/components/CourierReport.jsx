
import { Truck, AlertTriangle, ShieldCheck } from 'lucide-react'

const CourierReport = ({ result }) => {
  if (!result?.data) return null

  const data = result.data
  const summary = data.summary || {}

  const couriers = Object.entries(data)
    .filter(([key, value]) =>
      key !== 'summary' &&
      value &&
      typeof value === 'object' &&
      'total_parcel' in value
    )
    .map(([key, courier]) => ({
      id: key,
      ...courier,
    }))

  const reports = Array.isArray(data.reports)
    ? data.reports
    : []

  const stats = [
    {
      title: 'Total Parcels',
      value: summary.total_parcel ?? 0,
      style: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Delivered',
      value: summary.success_parcel ?? 0,
      style: 'bg-green-50 text-green-700',
    },
    {
      title: 'Cancelled',
      value: summary.cancelled_parcel ?? 0,
      style: 'bg-red-50 text-red-700',
    },
    {
      title: 'Success Rate',
      value: `${summary.success_ratio ?? 0}%`,
      style: 'bg-purple-50 text-purple-700',
    },
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Truck size={22} />
        </div>

        <div>
          <h2 className="font-bold text-lg">
            Courier History Report
          </h2>

          <p className="text-xs text-gray-500">
            Real-time courier information
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

        {stats.map((item) => (
          <div
            key={item.title}
            className={`p-4 rounded-xl ${item.style}`}
          >
            <p className="text-xs">{item.title}</p>

            <h3 className="text-xl font-bold mt-2">
              {item.value}
            </h3>
          </div>
        ))}

      </div>

      {/* Courier Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">

          <thead>
            <tr className="border-b border-gray-100 text-gray-500">
              <th className="py-3 pr-4">Courier</th>
              <th className="py-3 pr-4">Total</th>
              <th className="py-3 pr-4">Delivered</th>
              <th className="py-3 pr-4">Cancelled</th>
              <th className="py-3">Success</th>
            </tr>
          </thead>

          <tbody>
            {couriers.map((courier) => (
              <tr
                key={courier.id}
                className="border-b border-gray-50"
              >
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-2">
                    {courier.logo && (
                      <img
                        src={courier.logo}
                        alt=""
                        className="w-7 h-7 object-contain"
                      />
                    )}

                    <span className="font-semibold">
                      {courier.name}
                    </span>
                  </div>
                </td>

                <td className="py-4 pr-4">
                  {courier.total_parcel ?? 0}
                </td>

                <td className="py-4 pr-4 text-green-600">
                  {courier.success_parcel ?? 0}
                </td>

                <td className="py-4 pr-4 text-red-500">
                  {courier.cancelled_parcel ?? 0}
                </td>

                <td className="py-4 font-semibold">
                  {courier.success_ratio ?? 0}%
                </td>
              </tr>
            ))}

            {couriers.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No courier data found.
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>

      {/* Fraud Reports */}
      <div className="mt-7 border-t border-gray-100 pt-6">

        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-orange-500" />

          <h3 className="font-bold text-gray-900">
            Fraud / Merchant Reports ({reports.length})
          </h3>
        </div>

        {reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map((report, index) => (
              <div
                key={report.id || index}
                className="bg-red-50 border border-red-100 rounded-xl p-4"
              >
                <div className="flex justify-between gap-3">
                  <p className="font-semibold text-red-700">
                    {report.name || 'Unknown Reporter'}
                  </p>

                  <span className="text-xs text-red-500">
                    {report.courierName || 'Unknown Courier'}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mt-2">
                  {report.details || 'No additional details'}
                </p>

                {report.created_at && (
                  <p className="text-xs text-gray-500 mt-2">
                    {report.created_at}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2">
            <ShieldCheck size={20} />
            No merchant reports found.
          </div>
        )}

      </div>

    </div>
  )
}

export default CourierReport
