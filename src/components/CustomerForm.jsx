
import { useState } from 'react'
import {
  Search,
  Phone,
  Loader2,
} from 'lucide-react'

const CustomerForm = ({ onResult }) => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    onResult(null)

    const normalizedPhone = phone.trim().replace(/\s+/g, '')

    if (!/^01[3-9]\d{8}$/.test(normalizedPhone)) {
      setError('Please enter a valid 11-digit Bangladesh phone number.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch('/api/check-courier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: normalizedPhone,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Courier check failed')
      }

      onResult(result)

    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Courier History Check
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Enter a phone number to check the customer's courier history.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>

        <div className="relative">
          <Phone
            className="absolute left-3 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            required
            className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-black"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg mt-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-5 flex justify-center items-center gap-2 bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={19} className="animate-spin" />
              Checking Courier History...
            </>
          ) : (
            <>
              <Search size={19} />
              Check Courier History
            </>
          )}
        </button>

      </form>
    </div>
  )
}

export default CustomerForm
