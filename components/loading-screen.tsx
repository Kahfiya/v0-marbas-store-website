'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Batik Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="batik-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <path d="M10 0L20 10L10 20L0 10Z" fill="currentColor" className="text-primary" />
                <circle cx="10" cy="10" r="3" fill="currentColor" className="text-accent" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#batik-pattern)" />
            </svg>
          </div>

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mb-8"
          >
            {/* Ornamental Circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 opacity-30"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" strokeDasharray="8 4" />
              </svg>
            </motion.div>

            {/* Inner rotating circle */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 opacity-20"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" strokeDasharray="4 8" />
              </svg>
            </motion.div>

            {/* Logo Text */}
            <motion.h1
              className="text-5xl md:text-7xl font-sans font-bold tracking-wider text-foreground"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {'MARBAS'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-12"
          >
            Warisan Nusantara
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 md:w-80 h-[2px] bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-primary via-accent to-primary"
            />
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center gap-2 text-muted-foreground text-xs tracking-widest"
          >
            <span>MEMUAT</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              •
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              •
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              •
            </motion.span>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <svg width="60" height="30" viewBox="0 0 60 30" className="text-primary">
              <path d="M0 15 L15 0 L30 15 L45 0 L60 15" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M0 20 L15 5 L30 20 L45 5 L60 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
