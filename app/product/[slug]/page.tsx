'use client'

import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, Share2, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/hooks/use-cart'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { getProductBySlug } from '@/lib/products'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const product = getProductBySlug(resolvedParams.slug)

  if (!product) return notFound()

  return <ProductDetail product={product} />
}

function ProductDetail({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)

  const handleAddToCart = () => {
    const variantSuffix = [selectedSize, selectedColor].filter(Boolean).join('-')
    const variantId = variantSuffix ? `${product.id}-${variantSuffix}` : product.id
    const variantLabel = [selectedSize, selectedColor].filter(Boolean).join(' - ')

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: variantId,
        name: variantLabel ? `${product.name} (${variantLabel})` : product.name,
        price: product.price,
        image: product.gallery?.[selectedImage] || product.image,
        category: product.category,
      })
    }
  }

  const gallery = product.gallery ?? [product.image]
  const hasSizes = (product.variants?.sizes?.length ?? 0) > 0
  const hasColors = (product.variants?.colors?.length ?? 0) > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <CartDrawer />

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Produk
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image
                src={gallery[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-300"
                priority
                unoptimized
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-600">Baru</Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-amber-500 hover:bg-amber-600">Terlaris</Badge>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-amber-500 shadow-md scale-105'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-amber-600 uppercase tracking-widest mb-2 font-medium">
                {product.category}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} · {product.reviews} ulasan
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Sizes */}
            {hasSizes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Ukuran {selectedSize && <span className="text-amber-600">— {selectedSize}</span>}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants!.sizes!.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
                      className={`min-w-[44px] h-11 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                        selectedSize === size
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-200 hover:border-amber-300 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {hasColors && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Warna {selectedColor && <span className="text-amber-600">— {selectedColor}</span>}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants!.colors!.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color === selectedColor ? '' : color)}
                      className={`min-w-[44px] h-11 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                        selectedColor === color
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-200 hover:border-amber-300 text-gray-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Jumlah</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock > 0 ? `${product.stock} tersedia` : 'Stok habis'}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-base"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl border-2 border-gray-200 hover:border-amber-400"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl border-2 border-gray-200 hover:border-amber-400"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Details */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-amber-100">
              <h3 className="font-semibold text-gray-900 mb-4">Detail Produk</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Kategori</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Stok</span>
                  <span className="font-medium">{product.stock} unit</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-medium">{product.rating}/5.0 ({product.reviews} ulasan)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
