
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  try {
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL
    const sheetsSecret = process.env.GOOGLE_SHEETS_SECRET

    if (!sheetsUrl || !sheetsSecret) {
      return res.status(500).json({
        success: false,
        message: 'Google Sheets configuration is missing',
      })
    }

    const {
      customerName,
      phone,
      address,
      product,
      orderAmount,
      advance,
    } = req.body || {}

    // Required field validation
    if (
      !customerName?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !product?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields',
      })
    }

    const formattedPhone = String(phone)
      .trim()
      .replace(/[\s-]/g, '')
      .replace(/^\+?880/, '0')

    if (!/^01[3-9]\d{8}$/.test(formattedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid Bangladesh mobile number',
      })
    }

    const amount = Number(orderAmount)
    const advanceAmount = Number(advance)

    if (
      !Number.isFinite(amount) ||
      !Number.isFinite(advanceAmount) ||
      amount < 0 ||
      advanceAmount < 0 ||
      advanceAmount > amount
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order or advance amount',
      })
    }

    const due = amount - advanceAmount

    // Send ONLY customer information to Google Sheets
    const sheetsResponse = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'saveCustomer',
        secretToken: sheetsSecret,
        customerName: customerName.trim(),
        phone: formattedPhone,
        address: address.trim(),
        product: product.trim(),
        orderAmount: amount,
        advance: advanceAmount,
        due,
      }),
      signal: AbortSignal.timeout(20000),
    })

    const sheetsResult = await sheetsResponse.json()

    if (!sheetsResponse.ok || sheetsResult.success !== true) {
      console.error('Google Sheets Error:', sheetsResult)

      return res.status(502).json({
        success: false,
        message: sheetsResult.message || 'Failed to save customer',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Customer saved successfully',
    })

  } catch (error) {
    console.error('Save Customer Error:', error)

    if (
      error.name === 'TimeoutError' ||
      error.name === 'AbortError'
    ) {
      return res.status(504).json({
        success: false,
        message: 'Request timed out. Please try again.',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
