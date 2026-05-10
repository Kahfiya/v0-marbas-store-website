'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ShoppingBag, Heart, Eye, Star, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'

const products = [
  // Parfume (6 Products)
  {
    id: 'p1',
    name: 'Hera',
    category: 'parfume',
    price: 1250000,
    originalPrice: 1500000,
    image: '/images/Hera.jpg',
    rating: 4.9,
    reviews: 128,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'p2',
    name: 'Uranus',
    category: 'parfume',
    price: 980000,
    originalPrice: null,
    image: '/images/Uranus.jpg',
    rating: 4.7,
    reviews: 95,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'p3',
    name: 'Artemis',
    category: 'parfume',
    price: 1450000,
    originalPrice: null,
    image: '/images/Artemis.jpg',
    rating: 4.7,
    reviews: 67,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 'p4',
    name: 'Aphrodite',
    category: 'parfume',
    price: 1350000,
    originalPrice: 1600000,
    image: '/images/Aphrodite.jpg',
    rating: 4.8,
    reviews: 156,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'p5',
    name: 'Himeros',
    category: 'parfume',
    price: 890000,
    originalPrice: null,
    image: '/images/Himeros.jpg',
    rating: 4.5,
    reviews: 82,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'p6',
    name: 'Paladin',
    category: 'parfume',
    price: 2850000,
    originalPrice: 3200000,
    image: '/images/Paladin.jpg',
    rating: 5.0,
    reviews: 203,
    isNew: false,
    isBestSeller: true,
  },
  // Wearable (6 Products)
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
  },
  {
    id: 'w4',
    name: 'Kebaya Modern Silk',
    category: 'wearable',
    price: 2750000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 98,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 'w5',
    name: 'Sarung Samarinda Premium',
    category: 'wearable',
    price: 1850000,
    originalPrice: 2100000,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
    rating: 4.6,
    reviews: 134,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'w6',
    name: 'Ulos Batak Scarf',
    category: 'wearable',
    price: 1250000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 67,
    isNew: true,
    isBestSeller: false,
  },
  // Tech (3 Products)
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
  },
  {
    id: 't3',
    name: 'Nusantara Smartwatch Band',
    category: 'tech',
    price: 650000,
    originalPrice: 780000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 178,
    isNew: false,
    isBestSeller: true,
  },
]

const categories = [
  { id: 'all', name: 'Semua' },
  { id: 'parfume', name: 'Parfume' },
  { id: 'wearable', name: 'Wearable' },
  { id: 'tech', name: 'Tech' },
]

export function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])
  const { addItem } = useCart()

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory)

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

  const handleAddToCart = (product: typeof products[0]) => {
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
                  <div className="relative aspect-[4/5] overflow-hidden">
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
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Keranjang
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white/80 backdrop-blur-sm border-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {product.category}
                    </p>

                    {/* Name */}
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                      {product.name}
                    </h3>

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
