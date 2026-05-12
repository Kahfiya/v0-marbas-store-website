'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { products } from '@/lib/products'
import type { Product } from '@/lib/products'

const categories = [
  { id: 'all', name: 'Semua' },
  { id: 'services', name: 'Jasa Digital' },
  { id: 'wearable', name: 'Wearable' },
  { id: 'tech', name: 'Tech' },
]

interface ProductsSectionProps {
  searchQuery?: string
}

export function ProductsSection({ searchQuery = '' }: ProductsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])
  const { addItem } = useCart()

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory
    const matchSearch = searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
  }

  return (
    <section ref={ref} id="products" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-sm tracking-[0.3em] uppercase text-primary">Produk Unggulan</span>
            <div className="w-12 h-[1px] bg-primary" />
          </motion.div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Pilihan <span className="text-primary">Terbaik</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Produk berkualitas tinggi yang dipilih dengan cermat untuk Anda
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group"
              >
                <div className="relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                  {/* Image Container */}
                  <Link href={`/product/${product.slug}`}>
                  <div className="relative aspect-[4/5] overflow-hidden cursor-pointer">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredProduct === product.id ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      crossOrigin="anonymous"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                          Baru
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          Best Seller
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="px-3 py-1 bg-destructive text-white text-xs font-medium rounded-full">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        wishlist.includes(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 backdrop-blur-sm text-foreground hover:bg-white'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`}
                      />
                    </motion.button>

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4 flex gap-2"
                    >
                      <Button
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product) }}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Keranjang
                      </Button>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white/80 backdrop-blur-sm border-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {product.category}
                    </p>

                    {/* Name */}
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews} ulasan)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-12"
          >
            Lihat Semua Produk
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
