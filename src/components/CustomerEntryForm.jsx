
import { useState } from 'react'
import {
  User,
  Phone,
  MapPin,
  Package,
  Banknote,
  Wallet,
  Save,
  Loader2,
} from 'lucide-react'

const CustomerEntryForm = () => {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [product, setProduct] = useState('')
  const [orderAmount, setOrderAmount] = useState('')
  const [advance, setAdvance] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Automatic Due Calculation
  const due = Math.max(
    0,
    Number(orderAmount || 0) - Number(advance || 0)
  )

  const inputClass =
    'w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-black'

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')

    const normalizedPhone = phone.trim().replace(/\s+/g, '')

    if (!/^01[3-9]\d{8}$/.test(normalizedPhone)) {
      setError('Please enter a valid 11-digit Bangladesh phone number.')
      return
    }

    if (Number(orderAmount) < 0 || Number(advance) < 0) {
      setError('Amount cannot be negative.')
      return
    }

    if (Number(advance || 0) > Number(orderAmount || 0)) {
      setError('Advance cannot be greater than Order Amount.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch('/api/save-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: normalizedPhone,
          address: address.trim(),
          product: product.trim(),
          orderAmount: Number(orderAmount || 0),
          advance: Number(advance || 0),
          due,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Customer save failed.')
      }

      setMessage('Customer information saved successfully!')

      // Reset form after successful save
      setCustomerName('')
      setPhone('')
      setAddress('')
      setProduct('')
      setOrderAmount('')
      setAdvance('')

    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Customer Entry
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add customer information and save it to Google Sheets.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >

        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name *
          </label>

          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>

          <div className="relative">
            <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Address *
          </label>

          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter customer address"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>

          <div className="relative">
            <Package className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Enter product name"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Order Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Amount (৳) *
          </label>

          <div className="relative">
            <Banknote className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
              type="number"
              min="0"
              step="0.01"
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
              placeholder="Enter order amount"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Advance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Advance Amount (৳)
          </label>

          <div className="relative">
            <Wallet className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
              type="number"
              min="0"
              step="0.01"
              value={advance}
              onChange={(e) => setAdvance(e.target.value)}
              placeholder="Enter advance amount"
              className={inputClass}
            />
          </div>
        </div>

        {/* Due Amount */}
        <div className="sm:col-span-2 bg-gray-50 border border-gray-100 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Remaining Due Amount
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Order Amount - Advance Amount
              </p>
            </div>

            <h3 className="text-2xl font-bold text-red-600">
              ৳{due.toLocaleString('en-BD')}
            </h3>
          </div>
        </div>

        {/* Messages */}
        <div className="sm:col-span-2">

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-4">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg mb-4">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Saving Customer...
              </>
            ) : (
              <>
                <Save size={19} />
                Save Customer
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  )
}

export default CustomerEntryForm
