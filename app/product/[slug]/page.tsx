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

  const handleWhatsAppOrder = () => {
    const variantLabel = [selectedSize, selectedColor].filter(Boolean).join(' - ')
    const productName = variantLabel ? `${product.name} (${variantLabel})` : product.name
    const totalPrice = formatPrice(product.price * quantity)
    
    const message = `Halo MARBAS, saya ingin memesan:\n\nProduk: ${productName}\nJumlah: ${quantity}\nTotal: ${totalPrice}\n\nMohon informasi lebih lanjut. Terima kasih!`
    
    const whatsappUrl = `https://wa.me/6289536554001?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
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
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
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
              
              {/* WhatsApp Button */}
              <Button
                onClick={handleWhatsAppOrder}
                disabled={product.stock === 0}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Beli via WhatsApp
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
