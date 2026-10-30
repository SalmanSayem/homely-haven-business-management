
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed',
    })
  }

  try {
    const apiKey = process.env.BD_COURIER_API_KEY

    if (!apiKey) {
      return res.status(500).json({
        status: 'error',
        message: 'Courier API key is not configured',
      })
    }

    const { phone } = req.body || {}

    if (!phone) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number is required',
      })
    }

    const formattedPhone = String(phone)
      .replace(/[\s-]/g, '')
      .replace(/^\+?880/, '0')

    if (!/^01[3-9]\d{8}$/.test(formattedPhone)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please enter a valid Bangladesh mobile number',
      })
    }

    // BD Courier API
    const response = await fetch(
      'https://api.bdcourier.com/courier-check',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          phone: formattedPhone,
        }),
        signal: AbortSignal.timeout(15000),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      return res.status(502).json({
        status: 'error',
        message: result.message || 'Courier API request failed',
      })
    }

    if (result.status !== 'success' || !result.data) {
      return res.status(502).json({
        status: 'error',
        message: 'Invalid response received from Courier API',
      })
    }

    // Only return courier result.
    // No Google Sheets request here.
    return res.status(200).json(result)

  } catch (error) {
    console.error('Courier API Error:', error)

    if (
      error.name === 'TimeoutError' ||
      error.name === 'AbortError'
    ) {
      return res.status(504).json({
        status: 'error',
        message: 'Request timed out. Please try again.',
      })
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
}
