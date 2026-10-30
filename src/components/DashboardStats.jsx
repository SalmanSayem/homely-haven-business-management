
import {
  Users,
  Search,
  Truck,
  ShieldCheck
} from 'lucide-react'

const DashboardStats = () => {

  const stats = [
    {
      title: 'Total Customers',
      value: '1,250',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: "Today's Checks",
      value: '48',
      icon: Search,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Total Parcels',
      value: '3,420',
      icon: Truck,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Safe Customers',
      value: '1,080',
      icon: ShieldCheck,
      color: 'bg-green-50 text-green-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {stats.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.title}
            className="bg-white border border-gray-100 rounded-2xl p-5"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-3">
                  {item.value}
                </h2>
              </div>

              <div className={`p-3 rounded-xl ${item.color}`}>
                <Icon size={23} />
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default DashboardStats

