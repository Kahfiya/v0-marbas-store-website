'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const partners = [
  { 
    name: 'Tokopedia', 
    logo: 'https://ridergalau.id/wp-content/uploads/2026/01/Logo-Tokopedia.png' 
  },
  { 
    name: 'Shopee', 
    logo: 'https://logowik.com/content/uploads/images/shopee1950.jpg' 
  },
  { 
    name: 'Lazada', 
    logo: 'https://www.shinpo.co.id/wp-content/uploads/2021/10/lazada-logo-1.png' 
  },
  { 
    name: 'Blibli', 
    logo: 'https://images.seeklogo.com/logo-png/43/1/blibli-com-logo-png_seeklogo-431694.png' 
  },
  { 
    name: 'Bukalapak', 
    logo: 'https://ridergalau.id/wp-content/uploads/2026/01/Logo-Tokopedia.png' 
  },
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
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-secondary/50 hover:bg-secondary rounded-xl cursor-pointer transition-colors group"
              >
                <div className="relative w-20 h-12 transition-transform group-hover:scale-110">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner.name}
                </span>
              </motion.div>
            ))}
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
