'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Interactive mouse tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToCollections = () => {
    document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute inset-0"
        >
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="batik-hero" patternUnits="userSpaceOnUse" width="60" height="60">
                <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                <path d="M15 15L45 15L45 45L15 45Z" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#batik-hero)" />
          </svg>
        </motion.div>
      </div>

      {/* Gold Gradient Orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        {/* Ornamental Divider */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-accent">
            <path d="M12 0L24 12L12 24L0 12Z" fill="currentColor" />
          </svg>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <span className="text-foreground">MAR</span>
          <span className="text-primary">BAS</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground tracking-[0.2em] uppercase mb-4"
        >
          Warisan Nusantara dalam Sentuhan Modern
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl mx-auto text-muted-foreground mb-12 leading-relaxed"
        >
          Temukan koleksi eksklusif parfum, pakaian, dan teknologi 
          yang terinspirasi dari keindahan budaya Nusantara.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToCollections}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg tracking-wider group"
          >
            Jelajahi Koleksi
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-primary/30 text-foreground hover:bg-primary/10 px-8 py-6 text-lg tracking-wider"
          >
            Tentang Kami
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16 pt-8 border-t border-border/50"
        >
          {[
            { value: '11+', label: 'Produk' },
            { value: '67+', label: 'Pelanggan' },
            { value: '100%', label: 'Asli' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, type: 'spring' }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToCollections}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  )
}
