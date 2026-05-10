import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo (use database in production)
const subscribers: { email: string; subscribedAt: string }[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email tidak valid' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase())
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email sudah terdaftar' },
        { status: 409 }
      )
    }

    // Add subscriber
    subscribers.push({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Terima kasih telah berlangganan!',
      data: {
        email,
        subscribedAt: new Date().toISOString(),
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      totalSubscribers: subscribers.length,
      lastUpdated: new Date().toISOString(),
    },
  })
}
