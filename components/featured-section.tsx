'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// SVG Icons for each platform
const TokopediaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="currentColor">
    <circle cx="50" cy="50" r="45" fill="#42B549" />
    <path d="M50 25C36.2 25 25 36.2 25 50s11.2 25 25 25 25-11.2 25-25S63.8 25 50 25zm0 40c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" fill="white" />
    <circle cx="50" cy="50" r="8" fill="white" />
  </svg>
)

const ShopeeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="currentColor">
    <rect width="100" height="100" rx="10" fill="#EE4D2D" />
    <path d="M50 20c-10 0-18 8-18 18v2h-5v10h5v25h36V50h5V40h-5v-2c0-10-8-18-18-18zm-8 18c0-4.4 3.6-8 8-8s8 3.6 8 8v2H42v-2zm21 32H37V50h26v20z" fill="white" />
  </svg>
)

const LazadaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="currentColor">
    <rect width="100" height="100" rx="10" fill="#0F146D" />
    <path d="M25 35h10l5 30h-10l-5-30zm35 0h10l5 30h-10l-5-30zm-17.5 0h10l2.5 15-2.5 15h-10l2.5-15-2.5-15z" fill="#F57224" />
    <path d="M30 70h40v5H30v-5z" fill="white" />
  </svg>
)

const BlibliIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="currentColor">
    <rect width="100" height="100" rx="10" fill="#0095DA" />
    <circle cx="35" cy="50" r="12" fill="white" />
    <circle cx="65" cy="50" r="12" fill="white" />
    <path d="M35 42v16M65 42v16M30 50h10M60 50h10" stroke="#0095DA" strokeWidth="3" />
  </svg>
)

const BukalapakIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="currentColor">
    <rect width="100" height="100" rx="10" fill="#E31E52" />
    <path d="M30 65V45c0-11 9-20 20-20s20 9 20 20v20" stroke="white" strokeWidth="6" fill="none" />
    <circle cx="50" cy="65" r="10" fill="white" />
  </svg>
)

const partners = [
  { name: 'Tokopedia', icon: TokopediaIcon },
  { name: 'Shopee', icon: ShopeeIcon },
  { name: 'Lazada', icon: LazadaIcon },
  { name: 'Blibli', icon: BlibliIcon },
  { name: 'Bukalapak', icon: BukalapakIcon },
]

const awards = [
  { title: 'Best Indonesian Brand', year: '2024' },
  { title: 'Sustainable Fashion Award', year: '2023' },
  { title: 'E-Commerce Excellence', year: '2023' },
]

export function FeaturedSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 border-y border-border">
      <div className="container mx-auto px-4">
        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
            Tersedia di Platform Terpercaya
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {partners.map((partner, index) => {
              const IconComponent = partner.icon
              return (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-secondary/50 hover:bg-secondary rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="transition-transform group-hover:scale-110">
                    <IconComponent />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {partner.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-12 border-t border-border"
        >
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-3 px-6 py-3 bg-primary/5 rounded-full"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{award.title}</p>
                <p className="text-xs text-muted-foreground">{award.year}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
