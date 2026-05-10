'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Anindya Putri',
    role: 'Fashion Blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'Koleksi batik dari MARBAS benar-benar luar biasa! Kualitas kain dan detail jahitannya menunjukkan craftsmanship yang sangat tinggi. Saya selalu mendapat pujian setiap kali memakainya.',
    rating: 5,
    product: 'Batik Parang Modern',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    role: 'Entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Parfum Cendana Suci dari MARBAS menjadi signature scent saya. Aromanya unik, perpaduan tradisional dan modern yang sangat sophisticated. Tahan seharian penuh!',
    rating: 5,
    product: 'Cendana Suci',
  },
  {
    id: 3,
    name: 'Sari Dewi',
    role: 'Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Senang sekali menemukan brand yang mengangkat budaya Indonesia dengan cara yang elegan. Phone case batik saya sudah menjadi conversation starter di setiap meeting!',
    rating: 5,
    product: 'Batik Phone Case',
  },
  {
    id: 4,
    name: 'Raka Pratama',
    role: 'Tech Executive',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Wayang Earbuds bukan hanya memiliki desain yang memukau, kualitas suaranya juga premium. Perfect blend antara teknologi dan seni tradisional Indonesia.',
    rating: 5,
    product: 'Wayang Earbuds',
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-24 overflow-hidden">
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
            <span className="text-sm tracking-[0.3em] uppercase text-primary">Testimoni</span>
            <div className="w-12 h-[1px] bg-primary" />
          </motion.div>
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Kata <span className="text-primary">Mereka</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Kepuasan pelanggan adalah prioritas utama kami
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-lg relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-accent" />
              ))}
            </div>

            {/* Content */}
            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
              &ldquo;{testimonials[currentIndex].content}&rdquo;
            </p>

            {/* Product Tag */}
            <div className="inline-block px-4 py-2 bg-secondary rounded-full mb-6">
              <span className="text-sm text-muted-foreground">
                Produk: <span className="text-foreground font-medium">{testimonials[currentIndex].product}</span>
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                crossOrigin="anonymous"
              />
              <div>
                <h4 className="font-semibold text-foreground">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={`transition-all duration-300 ${index === currentIndex
                      ? 'w-8 h-2 bg-primary rounded-full'
                      : 'w-2 h-2 bg-primary/30 rounded-full hover:bg-primary/50'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border"
        >
          {[
            { value: '4.9', label: 'Rating' },
            { value: '67+', label: 'Ulasan' },
            { value: '98%', label: 'Kepuasan' },
            { value: '67+', label: 'Kota' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
