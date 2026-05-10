import { NextRequest, NextResponse } from 'next/server'

// Product data - in production, this would come from a database
const products = [
  {
    id: 'p1',
    name: 'Cendana Suci',
    category: 'parfume',
    price: 1250000,
    originalPrice: 1500000,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=500&fit=crop',
    rating: 4.9,
    reviews: 128,
    isNew: true,
    isBestSeller: false,
    description: 'Parfum premium dengan aroma cendana khas Indonesia yang menenangkan dan elegan.',
    stock: 45,
  },
  {
    id: 'p2',
    name: 'Melati Keraton',
    category: 'parfume',
    price: 980000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 95,
    isNew: false,
    isBestSeller: true,
    description: 'Wewangian melati yang terinspirasi dari taman keraton Jawa.',
    stock: 32,
  },
  {
    id: 'w1',
    name: 'Batik Parang Modern',
    category: 'wearable',
    price: 2450000,
    originalPrice: 2800000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 76,
    isNew: false,
    isBestSeller: true,
    description: 'Kemeja batik dengan motif parang klasik dalam desain modern.',
    stock: 18,
  },
  {
    id: 'w2',
    name: 'Tenun Sumba Jacket',
    category: 'wearable',
    price: 3200000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
    rating: 4.9,
    reviews: 54,
    isNew: true,
    isBestSeller: false,
    description: 'Jaket premium dengan detail tenun Sumba yang autentik.',
    stock: 12,
  },
  {
    id: 't1',
    name: 'Batik Phone Case',
    category: 'tech',
    price: 450000,
    originalPrice: 550000,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=500&fit=crop',
    rating: 4.6,
    reviews: 234,
    isNew: false,
    isBestSeller: true,
    description: 'Case handphone dengan motif batik yang elegan dan protektif.',
    stock: 89,
  },
  {
    id: 't2',
    name: 'Wayang Earbuds',
    category: 'tech',
    price: 1850000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 89,
    isNew: true,
    isBestSeller: false,
    description: 'Earbuds premium dengan desain terinspirasi dari wayang Indonesia.',
    stock: 25,
  },
  {
    id: 'p3',
    name: 'Pala Maluku',
    category: 'parfume',
    price: 1450000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 67,
    isNew: false,
    isBestSeller: false,
    description: 'Parfum dengan aroma pala khas Maluku yang hangat dan eksotis.',
    stock: 38,
  },
  {
    id: 'w3',
    name: 'Songket Blazer',
    category: 'wearable',
    price: 4500000,
    originalPrice: 5200000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    rating: 5.0,
    reviews: 42,
    isNew: true,
    isBestSeller: true,
    description: 'Blazer mewah dengan detail songket yang dikerjakan oleh pengrajin lokal.',
    stock: 8,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort')
  const limit = parseInt(searchParams.get('limit') || '100')

  let filteredProducts = [...products]

  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category)
  }

  // Search by name
  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    )
  }

  // Sort products
  if (sort) {
    switch (sort) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }
  }

  // Limit results
  filteredProducts = filteredProducts.slice(0, limit)

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, action } = body

    const product = products.find(p => p.id === productId)
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    if (action === 'check_stock') {
      return NextResponse.json({
        success: true,
        data: {
          id: product.id,
          name: product.name,
          inStock: product.stock > 0,
          stock: product.stock,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
