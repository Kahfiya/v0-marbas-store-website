'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Droplets, Shirt, Cpu, ArrowRight } from 'lucide-react'

const collections = [
  {
    id: 'parfume',
    name: 'Parfume',
    title: 'Aroma Nusantara',
    description: 'Wewangian eksklusif terinspirasi dari rempah-rempah dan bunga khas Indonesia',
    icon: Droplets,
    image: '/images/Catalog-Parfume.png',
    count: 6,
    color: 'from-amber-900/80 to-amber-700/60',
  },
  {
    id: 'wearable',
    name: 'Wearable',
    title: 'Busana Kontemporer',
    description: 'Pakaian modern dengan sentuhan motif batik dan tenun tradisional',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop',
    count: 6,
    color: 'from-stone-900/80 to-stone-700/60',
  },
  {
    id: 'tech',
    name: 'Tech',
    title: 'Teknologi Premium',
    description: 'Gadget dan aksesori dengan desain yang mengapresiasi estetika lokal',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=800&fit=crop',
    count: 3,
    color: 'from-slate-900/80 to-slate-700/60',
  },
]

export function CollectionsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const scrollToProducts = (category?: string) => {
    const productsSection = document.querySelector('#products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} id="collections" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-sm tracking-[0.3em] uppercase text-primary">Koleksi Kami</span>
            <div className="w-12 h-[1px] bg-primary" />
          </motion.div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Tiga Pilar <span className="text-primary">MARBAS</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Setiap koleksi merepresentasikan perpaduan sempurna antara warisan budaya 
            dan inovasi modern
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => scrollToProducts(collection.id)}
            >
              {/* Background Image */}
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.color}`} />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.2, type: 'spring' }}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4"
                >
                  <collection.icon className="w-7 h-7" />
                </motion.div>

                {/* Text */}
                <h3 
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {collection.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
                  {collection.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">
                    {collection.count} Produk
                  </span>
                  <motion.div
                    animate={{
                      x: hoveredIndex === index ? 5 : 0,
                    }}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    Lihat Semua
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Hover Effect Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white origin-left"
                />
              </div>

              {/* Batik Pattern Overlay */}
              <motion.div
                animate={{
                  opacity: hoveredIndex === index ? 0.1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id={`batik-${index}`} patternUnits="userSpaceOnUse" width="10" height="10">
                    <path d="M5 0L10 5L5 10L0 5Z" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#batik-${index})`} />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex justify-center mt-12"
        >
          <svg width="120" height="40" viewBox="0 0 120 40" className="text-primary/30">
            <path d="M0 20 L20 0 L40 20 L60 0 L80 20 L100 0 L120 20" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0 25 L20 5 L40 25 L60 5 L80 25 L100 5 L120 25" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
