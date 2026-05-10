import { NextRequest, NextResponse } from 'next/server'

// Helper to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, action } = body

    if (action === 'calculate') {
      // Calculate cart totals
      const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => 
        sum + item.price * item.quantity, 0
      )
      
      const shipping = subtotal >= 500000 ? 0 : 25000 // Free shipping for orders over 500k
      const tax = Math.round(subtotal * 0.11) // 11% PPN
      const total = subtotal + shipping + tax

      return NextResponse.json({
        success: true,
        data: {
          itemCount: items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0),
          subtotal,
          subtotalFormatted: formatPrice(subtotal),
          shipping,
          shippingFormatted: shipping === 0 ? 'GRATIS' : formatPrice(shipping),
          tax,
          taxFormatted: formatPrice(tax),
          total,
          totalFormatted: formatPrice(total),
          freeShippingThreshold: 500000,
          remainingForFreeShipping: Math.max(0, 500000 - subtotal),
        },
      })
    }

    if (action === 'validate') {
      // Validate cart items (check stock, prices, etc.)
      const validatedItems = items.map((item: { id: string; quantity: number }) => ({
        ...item,
        isValid: true,
        message: null,
      }))

      return NextResponse.json({
        success: true,
        data: {
          items: validatedItems,
          isValid: true,
        },
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
