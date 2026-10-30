
import {
  LayoutDashboard,
  Users,
  Search,
  History,
  Settings,
  ShieldCheck,
  Truck
} from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Check Courier', icon: Search },
    { name: 'Customers', icon: Users },
    { name: 'Check History', icon: History },
    { name: 'Settings', icon: Settings },
  ]

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 p-5 hidden md:flex flex-col">

      {/* Company Branding */}
      <div className="flex items-center gap-3 mb-10">

        {/* Company Logo */}
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">

          <img
            src="/logo.png"
            alt="Homely Haven Logo"
            className="w-full h-full object-contain p-1"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling.style.display = 'block'
            }}
          />

          <Truck
            size={25}
            className="text-gray-800 hidden"
          />

        </div>

        {/* Company Name */}
        <div className="min-w-0">
          <h2 className="font-bold text-base text-gray-900 leading-5">
            Homely Haven
          </h2>

          <p className="text-xs text-gray-500 mt-1 leading-4">
            Business Management
          </p>
        </div>

      </div>


      {/* Menu Heading */}
      <p className="text-xs font-semibold text-gray-400 uppercase mb-4 tracking-wider">
        Main Menu
      </p>


      {/* Navigation Menu */}
      <nav className="space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <a
              key={item.name}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                item.active
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <Icon size={19} />
              {item.name}
            </a>
          )
        })}

      </nav>


      {/* Bottom Section */}
      <div className="mt-auto">

        {/* Security Card */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">

          <div className="flex items-center gap-2 mb-2">

            <ShieldCheck
              size={20}
              className="text-green-600"
            />

            <span className="text-sm font-semibold text-gray-800">
              Secure System
            </span>

          </div>

          <p className="text-xs text-gray-500 leading-5">
            Your customer information is managed securely.
          </p>

        </div>


        {/* Account Information */}
        <div className="mt-5 flex items-center gap-3 p-3 rounded-xl border border-gray-100">

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold shrink-0">
            S
          </div>

          {/* Account Name */}
          <div className="min-w-0">
            <p className="text-xs text-gray-400">
              Account Name
            </p>

            <h3 className="text-sm font-semibold text-gray-800">
              Salman
            </h3>
          </div>

        </div>


        {/* Footer */}
        <p className="text-center text-[10px] text-gray-400 mt-5">
          © 2026 Homely Haven
        </p>

      </div>

    </aside>
  )
}

export default Sidebar
