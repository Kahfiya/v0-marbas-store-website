import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo (use database in production)
const messages: {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid' },
        { status: 400 }
      )
    }

    // Create message
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    }

    messages.push(newMessage)

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.',
      data: {
        id: newMessage.id,
        createdAt: newMessage.createdAt,
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
      totalMessages: messages.length,
      subjects: {
        general: messages.filter(m => m.subject === 'general').length,
        order: messages.filter(m => m.subject === 'order').length,
        partnership: messages.filter(m => m.subject === 'partnership').length,
        feedback: messages.filter(m => m.subject === 'feedback').length,
      },
      lastUpdated: new Date().toISOString(),
    },
  })
}
